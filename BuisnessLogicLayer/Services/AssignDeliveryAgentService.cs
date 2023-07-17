using AutoMapper;
using Azure.Core;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Reflection.Metadata.Ecma335;

namespace BusinessLogicLayer.Services
{
    public class AssignDeliveryAgentService : IAssignDeliveryAgentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public AssignDeliveryAgentService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto> GetAllAsync(int pageNumber = 1, int limit = 10)
        {
            var allItems = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c=> c.Orders).Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();    
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
            var responseObject = new List<object>();
   
            bool saveResult = false;
            foreach (var obj in assignManuallyDto.List)
            {     
                var assignNewAgent = new AssignDeliveryAgent();
                var newOrder = new Order();
                newOrder.AssignDeliveryAgentId = assignNewAgent.Id;
                mapper.Map(obj, newOrder);
                mapper.Map(obj,assignNewAgent);
                assignNewAgent.CreatedOn = DateTime.Now;
                assignNewAgent.UpdatedOn = DateTime.Now;
                assignNewAgent.Orders.Add(newOrder);

                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignNewAgent);
                assignNewAgent.OrdersCount = assignNewAgent.Orders.Count;

                saveResult = await unitOfWork.SaveAsync();
                responseObject.Add(assignNewAgent);                            
            }
           
            return new ResponseDto()
            {
                StatusCode = saveResult ? 200 : 500,
                Success    = saveResult,
                Data       = responseObject,
                Message    = saveResult ? StringConstant.AssignedSuccessMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto)
        {
            var responseObject = new List<object>();
            
            bool saveResult = false;
            foreach(var obj in assignAgentAutomaticallyDto.List)
            {
                var assignedAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c => c.Orders)
               .FirstOrDefaultAsync(c => c.PickupLatitude == obj.PickupLatitude
               && c.PickupLongitude == obj.PickupLongitude);

                if (assignedAgent != null && IsAgentAvailableForAnotherOrder(assignedAgent.DeliveryAgentId, obj.DeliveryAddressLatitude
                    , obj.DeliveryAddressLongitude, obj.PickupLatitude, obj.PickupLongitude))
                {
                    // Assigning New Order to the same agent with same pickup point(Vendor's Location)
                    var anotherOrderInSameLocality = new Order();
                    anotherOrderInSameLocality.AssignDeliveryAgentId = assignedAgent.Id;
                    mapper.Map(obj, anotherOrderInSameLocality);
                    assignedAgent.Orders.Add(anotherOrderInSameLocality);
                    assignedAgent.OrdersCount = assignedAgent.Orders.Count;

                    saveResult = await unitOfWork.SaveAsync();
                    responseObject.Add(assignedAgent);
                }
                else
                {
                    // Search for suitable delivery agent in Database.
                    var getNearestDeliveryAgentId = await NearestAgentWithinRange(obj.DeliveryAddressLatitude
                    , obj.DeliveryAddressLongitude, obj.PickupLatitude, obj.PickupLongitude, 5);

                    // If we didn't get any agent nearby , push notification .i.e, No delivery agent is available nearby
                    if (getNearestDeliveryAgentId == null)
                    {
                        return new ResponseDto
                        {
                            StatusCode = 404,
                            Success = false,
                            Message = StringConstant.NotAvailableMessage,
                        };
                    }

                    var existingAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Include(c => c.Orders).FirstOrDefaultAsync(u =>
                    u.DeliveryAgentId == getNearestDeliveryAgentId);

                    if (existingAgent != null)
                    {
                        var createNewOrder = new Order();
                        mapper.Map(obj, createNewOrder);

                        // Adding Orders to agent list
                        existingAgent.Orders.Add(createNewOrder);
                        existingAgent.OrdersCount = existingAgent.Orders.Count;
                        saveResult = await unitOfWork.SaveAsync();
                        responseObject.Add(existingAgent);
                    }
                    else
                    {
                        // If we get agent nearby , then assign agent to that order
                        var assignNewAgent = new AssignDeliveryAgent();

                        assignNewAgent.DeliveryAgentId = (long)getNearestDeliveryAgentId;

                        var newOrder = new Order();
                        mapper.Map(obj, newOrder);
                        newOrder.AssignDeliveryAgentId = assignNewAgent.Id;
                        assignNewAgent.Orders.Add(newOrder);
                        
                        mapper.Map(obj, assignNewAgent);
                        assignNewAgent.CreatedOn = DateTime.Now;
                        assignNewAgent.UpdatedOn = DateTime.Now;

                        await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignNewAgent);
                        assignNewAgent.OrdersCount = assignNewAgent.Orders.Count;
                        saveResult = await unitOfWork.SaveAsync();
                        responseObject.Add(assignNewAgent);
                    }
                }             
            }

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success    = saveResult,
                Data       = responseObject,
                Message    = saveResult ? StringConstant.AssignedSuccessMessage : StringConstant.DatabaseMessage
            };
        }

        private bool IsAgentAvailableForAnotherOrder(long agentId , double deliveryLatitude, double deliveryLongitude, double pickupLatitude , double pickupLongitude)
        {
            var agent = unitOfWork.ServiceLocationRepository.GetAll().FirstOrDefault(u => u.DeliveryAgentId == agentId
           && u.IsActive
           && u.AgentStatus == ServiceLocation.AvailabilityStatus.OnDuty
           );

            // Check Delivery region is within the range according to the preferences of delivery agent.
            double deliveryDistance = CalculateDistance(deliveryLatitude, deliveryLongitude, agent.Latitude, agent.Longitude);
            // Check Pickup region is within the range according to the preferences of delivery agent.
            double pickupDistance = CalculateDistance(pickupLatitude, pickupLongitude, agent.Latitude, agent.Longitude);

            if (deliveryDistance <= 5 && pickupDistance <= 5)
            {
                return true;
            }
            return false;

        }

        public async Task<long?> NearestAgentWithinRange(double deliveryLatitude, double deliveryLongitude, double pickupLatitude, double pickupLongitude, int maxDistance)
        {
            // Find current day in string format
            DateTime currentTime         = DateTime.Now;
            DayOfWeek currentDayOfWeek   = currentTime.DayOfWeek;
            // Current Day in String Format like Monday, Tuesday
            string currentDay            = currentDayOfWeek.ToString();
            // Current Time like 9:00, 17:00
            TimeSpan currentTimeOfDay    = currentTime.TimeOfDay;

            // Available Delivery agent list based on Working preferences.
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
    }
}
