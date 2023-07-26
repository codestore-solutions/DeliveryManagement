using AutoMapper;
using Azure;
using Azure.Core;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Newtonsoft.Json;

namespace BusinessLogicLayer.Services
{
    public class AssignDeliveryAgentService : IAssignDeliveryAgentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly HttpClient httpClient;
        private readonly Dictionary<long, long> _assignedAgents = new Dictionary<long, long>();

        public AssignDeliveryAgentService(IUnitOfWork unitOfWork,IMapper mapper, HttpClient httpClient)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.httpClient = httpClient;
        }

        public async Task<ResponseDto> GetAllAsync(int pageNumber = 1, int limit = 10)
        {
            var allItems = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();    
            return new ResponseDto
            {
                StatusCode  = 200,
                Success     = true,
                Data        = allItems,
                Message     = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            var responseObject = new List<object>();  
            bool saveResult = false;
            foreach (var obj in assignManuallyDto.List)
            {     
                var assignNewAgent = new AssignDeliveryAgent();               
                mapper.Map(obj, assignNewAgent);
                assignNewAgent.CreatedOn = DateTime.Now;
                assignNewAgent.UpdatedOn = DateTime.Now;

                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignNewAgent);
                saveResult = await unitOfWork.SaveAsync();
                responseObject.Add(assignNewAgent);                           
            }
           
            return new ResponseDto()
            {
                StatusCode = 200,
                Success    = true,
                Data       = responseObject,
                Message    = saveResult ? StringConstant.AssignedSuccessMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto)
        {
            var responseObjectList = new List<AutomaticallyAssignResponseDto>();       
            foreach(var obj in assignAgentAutomaticallyDto.List)
            {
                // Search for suitable delivery agent in Database.
                var getNearestDeliveryAgentId = await NearestAgentWithinRange(obj.DeliveryAddressLatitude, obj.DeliveryAddressLongitude,
                    obj.PickupLatitude, obj.PickupLongitude, 5);

                // If we didn't get any agent nearby , push notification .i.e, No delivery agent is available nearby
                if (getNearestDeliveryAgentId == null)
                {
                    var responseObj1 = new AutomaticallyAssignResponseDto
                    {
                        DeliveryAgentId = null,
                        DeliveryAgentName = StringConstant.NotAvailableMessage,
                        OrderId = obj.OrderId
                    };

                    responseObjectList.Add(responseObj1);
                    continue;
                }
                // If we get agent nearby , then assign order to that agent

                var agent = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == getNearestDeliveryAgentId);
                if(agent == null)
                {
                    return new ResponseDto();
                }

                var responseObj = new AutomaticallyAssignResponseDto
                {
                    DeliveryAgentName = agent.FullName,
                    DeliveryAgentId   = getNearestDeliveryAgentId,
                    OrderId           = obj.OrderId
                };
                responseObjectList.Add(responseObj);                       
            }

            return new ResponseDto
            {
                StatusCode =  200 ,
                Success    = true,
                Data       = responseObjectList,
                Message    = StringConstant.AssignedSuccessMessage 
            };
        }

        private bool IsAgentAvailableForAnotherOrder(long agentId , double deliveryLatitude, double deliveryLongitude, double pickupLatitude , double pickupLongitude)
        {
            var agent = unitOfWork.ServiceLocationRepository.GetAll().FirstOrDefault(u => u.DeliveryAgentId == agentId
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
        }

        public async Task<long?> NearestAgentWithinRange(double deliveryLatitude, double deliveryLongitude, double pickupLatitude, double pickupLongitude, int maxDistance)
        {
            // Find current day in string format
            DateTime currentTime = DateTime.Now;
            DayOfWeek currentDayOfWeek = currentTime.DayOfWeek;

            // Current Day in String Format like Monday, Tuesday
            string currentDay = currentDayOfWeek.ToString();
            
            // Current Time like 9:00, 17:00
            TimeSpan currentTimeOfDay = currentTime.TimeOfDay;

            // Fetching available Delivery agents list based on Working location preferences from Db.
            var availableAgentList = await unitOfWork.ServiceLocationRepository.GetAll().Where(u=> u.IsActive 
            && u.AgentStatus == ServiceLocation.AvailabilityStatus.OnDuty
            && u.SelectedDays.Contains(currentDay)
            && currentTimeOfDay <= u.EndTime 
            && currentTimeOfDay >= u.StartTime ).ToListAsync();
            
            long? nearsestAgentId = null;
            foreach (var agent in availableAgentList)
            {             
                // Check Delivery region is within the range according to the preferences of delivery agent.
                double deliveryDistance = CalculateDistance(deliveryLatitude, deliveryLongitude, agent.Latitude, agent.Longitude);
                // Check Pickup region is within the range according to the preferences of delivery agent.
                double pickupDistance   = CalculateDistance(pickupLatitude, pickupLongitude, agent.Latitude, agent.Longitude);

                if (deliveryDistance <= maxDistance && pickupDistance <= maxDistance)
                {
                    nearsestAgentId = agent.DeliveryAgentId;
                    return nearsestAgentId;
                }
            }
            return nearsestAgentId;
        }

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

        public async Task<ResponseDto?> AcceptOrderAsync(AcceptRejectOrderDto acceptRejectOrderDto)
        {
            var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().FirstOrDefaultAsync(u => u.OrderId == acceptRejectOrderDto.OrderId);
            if(assignedAgent == null)
            {
                return null;
            }

            using var client = new HttpClient();
            var requestBody  = new UpdateOrderStatusDto();
            requestBody.status = acceptRejectOrderDto.OrderStatus;
            requestBody.orders.Add(acceptRejectOrderDto.OrderId);
            
            HttpContent requestJson = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9ta2FyLnNoYXJtYUBleGFtcGxlLmNvbSIsInJvbGUiOiI1IiwiaWQiOiI3IiwiZXhwIjoxNjk1NjM4NzU2fQ.igzzKvqwh64yT9dtVwqUfuYC28nkYa-w97TAEJS8P64";
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            var microserviceResponse = client.PutAsync("https://order-processing-dev.azurewebsites.net/api/v1/order/updateOrder", requestJson).Result;

            if (microserviceResponse.IsSuccessStatusCode)
            {
                assignedAgent.orderStatus = (AssignDeliveryAgent.OrderStatus)acceptRejectOrderDto.OrderStatus;
                await unitOfWork.SaveAsync();
                return new ResponseDto
                {
                    StatusCode = 200,
                    Success    = true,
                    Data       = requestBody,
                    Message    = StringConstant.SuccessMessage
                };
            }
            else
            {
                return new ResponseDto
                {
                    StatusCode = 400,
                    Success    = false,
                    Data       = requestBody,
                    Message    = StringConstant.ErrorMessage
                };
            }
        }

    }
}
