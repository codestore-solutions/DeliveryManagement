using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text;

namespace BusinessLogicLayer.Services
{
    public class AssignDeliveryAgentService : IAssignDeliveryAgentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
      //  private readonly HttpClient httpClient;
        private readonly Dictionary<long, long> _assignedAgents = new Dictionary<long, long>();

        public AssignDeliveryAgentService(IUnitOfWork unitOfWork, IMapper mapper/*, HttpClient httpClient*/)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            //this.httpClient = httpClient;
        }

        public async Task<ResponseDto> GetAllAsync(int pageNumber = 1, int limit = 10)
        {
            var allItems = await unitOfWork.AssignDeliveryAgentRepository.GetAllAsQueryable().Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = allItems,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            using var client = new HttpClient();
            var responseObject = new List<object>();
            bool saveResult = false;
            foreach (var obj in assignManuallyDto.List)
            {
                var assignNewAgent = new AssignDeliveryAgent();
                mapper.Map(obj, assignNewAgent);
                assignNewAgent.DeliveryStatus = (EnumConstants.DeliveryStatus)obj.orderStatus;
                assignNewAgent.CreatedOn = assignNewAgent.UpdatedOn = DateTime.Now;
                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignNewAgent);
                //  _assignedAgents.Add(obj.OrderId, obj.AgentId);
                /*  var timer = new Timer(30000);
                  timer.Elapsed += (sender, e) => HandleTimeout(obj.OrderId);
                  Console.WriteLine("Timer started. Waiting for 30 seconds...");
                  timer.Start();*/
                saveResult = await unitOfWork.SaveAsync();
                responseObject.Add(assignNewAgent);
            }

            // Updating order status in order-processing module.
            var requestBody = new UpdateOrderStatus();
            requestBody.orderStatus = 5;
            foreach (var obj in assignManuallyDto.List)
            {
                var order = new Order
                {
                    orderId = obj.OrderId,
                    deliveryAgentId = obj.AgentId,
                };
                requestBody.orders.Add(order);
            }

            HttpContent requestJson = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            // Add the authorization header with the token
            string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW4uc2hhaEBleGFtcGxlLmNvbSIsInJvbGUiOiIyIiwiaWQiOiIyIiwiYnVzaW5lc3NDYXRlZ29yeSI6IjEiLCJleHAiOjE2OTQ2Njg1NTd9.5o0-bpi-JluyVoztkzksonQRmCINzYjPYle6xVu4HHo";
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            var microserviceResponse = client.PutAsync("https://order-processing-dev.azurewebsites.net/api/v1/order/updateOrderWithAgent", requestJson).Result;
            if (microserviceResponse.IsSuccessStatusCode)
            {
                return new ResponseDto()
                {
                    StatusCode = 200,
                    Success = true,
                    Data = responseObject,
                    Message = saveResult ? StringConstant.AssignedSuccessMessage : StringConstant.DatabaseMessage
                };
            }
            else
            {
                return new ResponseDto()
                {
                    StatusCode = 400,
                    Success = false,
                    Message = StringConstant.MicroserviceError
                };
            }
        }

        private void HandleTimeout(long orderId)
        {
            if (_assignedAgents.ContainsKey(orderId))
            {
                // Order was not accepted within the timeout
                _assignedAgents.Remove(orderId);
            }
        }

        public void AcceptOrder(int orderId)
        {
            if (_assignedAgents.ContainsKey(orderId))
            {
                // The assigned agent accepted the order
                // Handle the accepted order logic here
            }
        }

        public void RejectOrder(int orderId)
        {
            if (_assignedAgents.ContainsKey(orderId))
            {
                // The assigned agent rejected the order
                // Handle the rejected order logic here
                _assignedAgents.Remove(orderId);
            }
        }

        public async Task<ResponseDto?> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto)
        {
            var responseObjectList = new List<AutomaticallyAssignResponseDto>();
            foreach (var obj in assignAgentAutomaticallyDto.List)
            {
                // Search for suitable delivery agent within 5 km radius in Database.
                var getNearestDeliveryAgentId = await NearestAgentWithinRange(obj.DeliveryAddressLatitude, obj.DeliveryAddressLongitude,
                    obj.PickupLatitude, obj.PickupLongitude, 5, 28);

                // If we didn't get any agent nearby , push notification .i.e, No delivery agent is available nearby
                if (getNearestDeliveryAgentId == null)
                {
                    var notAvailableResponse = new AutomaticallyAssignResponseDto
                    {
                        DeliveryAgentId = null,
                        DeliveryAgentName = StringConstant.NotAvailableMessage,
                        OrderId = obj.OrderId
                    };
                    responseObjectList.Add(notAvailableResponse);
                    continue;
                }
                // If we get agent nearby , then assign order to that agent

                var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == getNearestDeliveryAgentId);
                if (agent == null)
                {
                    return null;
                }

                var responseObj = new AutomaticallyAssignResponseDto
                {
                    DeliveryAgentName = agent.FullName,
                    DeliveryAgentId = getNearestDeliveryAgentId,
                    OrderId = obj.OrderId
                };
                responseObjectList.Add(responseObj);
            }

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = responseObjectList,
                Message = StringConstant.AssignedSuccessMessage
            };
        }

        /*  private bool IsAgentAvailableForAnotherOrder(long agentId , double deliveryLatitude, double deliveryLongitude, double pickupLatitude , double pickupLongitude)
        {
            var agent = unitOfWork.ServiceLocationRepository.GetAllAsQueryable().FirstOrDefault(u => u.AgentId == agentId
            && u.IsActive
            && u.AgentStatus == ServiceLocation.AvailabilityStatus.OnDuty);
            
            // Check Delivery region is within the range according to the preferences of delivery agent.
            double deliveryDistance = CalculateDistance(deliveryLatitude, deliveryLongitude, agent.Latitude, agent.Longitude);
            // Check Pickup region is within the range according to the preferences of delivery agent.
            double pickupDistance   = CalculateDistance(pickupLatitude, pickupLongitude, agent.Latitude, agent.Longitude);

            if (deliveryDistance <= 5 && pickupDistance <= 5)
            {
                return true;
            }
            return false;
        }*/

        public async Task<long?> NearestAgentWithinRange(double deliveryLatitude, double deliveryLongitude, double pickupLatitude,
            double pickupLongitude, int maxDistance, long? slotId)
        {
            // Find current day in string format
            DateTime currentTime = DateTime.Now;
            DayOfWeek currentDayOfWeek = currentTime.DayOfWeek;

            // Current Day in String Format like Monday, Tuesday
            string currentDay = currentDayOfWeek.ToString();

            // Current Time like 9:00, 17:00
            TimeSpan currentTimeOfDay = currentTime.TimeOfDay;

            // Fetching available Delivery agents list based on Working location preferences from Db.
            var availableAgentList = await unitOfWork.ServiceLocationRepository.GetAllAsQueryable().Where(u => u.IsActive
            && u.AgentDetails.AgentStatus == EnumConstants.AvailabilityStatus.OnDuty
            && u.AgentDetails.verificationStatus == EnumConstants.VerificationStatus.Verified
            && u.SelectedDays.Contains(currentDay)).ToListAsync();
           // && u.AgentTimeSlots.Any(slot => slot.TimeSlotId == slotId)).ToListAsync();

            long? nearsestAgentId = null;
            foreach (var agent in availableAgentList)
            {
                // Check Delivery region is within the range according to the preferences of delivery agent.
                double deliveryDistance = CalculateDistance(deliveryLatitude, deliveryLongitude, agent.Latitude, agent.Longitude);
                // Check Pickup region is within the range according to the preferences of delivery agent.
                double pickupDistance = CalculateDistance(pickupLatitude, pickupLongitude, agent.Latitude, agent.Longitude);

                if (deliveryDistance <= maxDistance && pickupDistance <= maxDistance)
                {
                    nearsestAgentId = agent.AgentDetails.AgentId;
                    return nearsestAgentId;
                }
            }
            return nearsestAgentId;
        }


        // Used to calculate distance between two coordinates.
        private static double CalculateDistance(double startLatitude, double startLongitude, double endLatitude, double endLongitude)
        {
            const double EarthRadius = 6371;
            double dLat = ToRadians(endLatitude - startLatitude);
            double dLon = ToRadians(endLongitude - startLongitude);
            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(ToRadians(startLatitude)) * Math.Cos(ToRadians(endLatitude)) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            double distance = EarthRadius * c;
            return distance;
        }

        private static double ToRadians(double degrees)
        {
            return degrees * (Math.PI / 180);
        }

        public async Task<ResponseDto?> AcceptOrderAsync(AcceptRejectOrderDto acceptRejectOrderDto, string token)
        {

            using var client = new HttpClient();

            var requestBody = new UpdateOrderStatusDto();
            requestBody.status = acceptRejectOrderDto.DeliveryStatus;
            foreach (var orderId in acceptRejectOrderDto.OrderIds)
            {
                requestBody.orders.Add(orderId);
            }

            HttpContent requestJson = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            string token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9ta2FyLnNoYXJtYUBleGFtcGxlLmNvbSIsInJvbGUiOiI1IiwiaWQiOiI3IiwiZXhwIjoxNjk1NjM4NzU2fQ.igzzKvqwh64yT9dtVwqUfuYC28nkYa-w97TAEJS8P64";
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token1}");
            var microserviceResponse = client.PutAsync("https://order-processing-dev.azurewebsites.net/api/v1/order/updateOrder", requestJson).Result;

            if (microserviceResponse.IsSuccessStatusCode)
            {
                foreach (var orderId in acceptRejectOrderDto.OrderIds)
                {
                    var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.OrderId == orderId);
                    if (assignedAgent == null)
                    {
                        continue;
                    }
                    assignedAgent.DeliveryStatus = (EnumConstants.DeliveryStatus)acceptRejectOrderDto.DeliveryStatus;
                    await unitOfWork.SaveAsync();
                }

                return new ResponseDto
                {
                    StatusCode = 200,
                    Success = true,
                    Data = requestBody,
                    Message = StringConstant.SuccessMessage
                };
            }
            else
            {
                return new ResponseDto
                {
                    StatusCode = 400,
                    Success = false,
                    Data = requestBody,
                    Message = StringConstant.MicroserviceError
                };
            }
        }

        public async Task<ResponseDto?> GetDeliveredOrRejectedOrdersCountAsync(long agentId)
        {
            var rejectedOrdersCount = await unitOfWork.AssignDeliveryAgentRepository.GetAllAsQueryable().Where(u => u.AgentId == agentId
            && u.DeliveryStatus == EnumConstants.DeliveryStatus.Rejected).CountAsync();

            var countDeliverd = await unitOfWork.AssignDeliveryAgentRepository.GetAllAsQueryable().Where(u => u.AgentId == agentId
            && u.DeliveryStatus == (EnumConstants.DeliveryStatus)11).CountAsync();

            var response = new DeliveredOrRejectedOrdersCountDto
            {
                DeliveredOrdersCount = countDeliverd,
                RejectedOrdersCount = rejectedOrdersCount
            };

            return new ResponseDto { StatusCode = 200, Success = true, Data = response, Message = StringConstant.SuccessMessage };
        }

        public async Task<ResponseDto?> UpdatePickupOrDeliveryStatusAsync(UpdatePickupOrDeliveryStatusDto pickupOrDeliveryStatusDto)
        {
            using var client = new HttpClient();

            var requestBody = new UpdateOrderStatusDto();
            requestBody.status = pickupOrDeliveryStatusDto.DeliveryStatus;
            foreach (var orderId in pickupOrDeliveryStatusDto.OrderIds)
            {
                requestBody.orders.Add(orderId);
            }

            HttpContent requestJson = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9ta2FyLnNoYXJtYUBleGFtcGxlLmNvbSIsInJvbGUiOiI1IiwiaWQiOiI3IiwiZXhwIjoxNjk1NjM4NzU2fQ.igzzKvqwh64yT9dtVwqUfuYC28nkYa-w97TAEJS8P64";
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            var microserviceResponse = client.PutAsync("https://order-processing-dev.azurewebsites.net/api/v1/order/updateOrder", requestJson).Result;

            if (microserviceResponse.IsSuccessStatusCode)
            {
                foreach (var orderId in pickupOrDeliveryStatusDto.OrderIds)
                {
                    var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.OrderId == orderId);
                    if (assignedAgent == null)
                    {
                        return null;
                    }
                    assignedAgent.DeliveryStatus = (EnumConstants.DeliveryStatus)pickupOrDeliveryStatusDto.DeliveryStatus;
                    if (pickupOrDeliveryStatusDto.DeliveryStatus == 8)
                    {
                        assignedAgent.DeliveryImage = pickupOrDeliveryStatusDto.Image;
                    }
                    else
                    {
                        assignedAgent.PickupImage = pickupOrDeliveryStatusDto.Image;
                    }
                    await unitOfWork.SaveAsync();
                }

                return new ResponseDto
                {
                    StatusCode = 200,
                    Success = true,
                    Data = requestBody,
                    Message = StringConstant.SuccessMessage
                };
            }
            else
            {
                return new ResponseDto
                {
                    StatusCode = 400,
                    Success = false,
                    Data = requestBody,
                    Message = StringConstant.MicroserviceError
                };
            }
        }

    }
}
