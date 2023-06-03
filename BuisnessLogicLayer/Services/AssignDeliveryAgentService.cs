using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using static EntityLayer.Models.BusinessAdmin;
using static EntityLayer.Models.ServiceLocation;

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
        public async Task<IEnumerable<AgentAssign>> GetAllAsync(int pageNumber=1, int limit=1000)
        {
            var allItems = await unitOfWork.AssignDeliveryAgentRepository.AsQueryableAsync();
            // Pagination
            var paginatedItems = allItems.Skip((pageNumber - 1) * limit).Take(limit);
            return paginatedItems;
        }
        public async Task<AgentAssign> AddNearsetDeliveryAgentAsync(AgentAssignRequestDto agentAssignRequestDto)
        {
            double restaurantLatitude = 29.3993233;
            double restaurantLongitude = 76.6561982;
            var nearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(restaurantLatitude, restaurantLongitude, 10);
            var orderList = await unitOfWork.OrderRepository.AsQueryableAsync();
            orderList = orderList.Where(order => order.Id == agentAssignRequestDto.OrderId);
            foreach (var order in orderList)
            {
                order.isOrderAssigned = (Order.IsOrderAssigned)1;
            }
            
            var orderAssigned = new AgentAssign
            {
                DeliveryAgentId = nearestDeliveryAgentId,
                OrderId = agentAssignRequestDto.OrderId
            };
            var agent = unitOfWork.ServiceLocationRepository.Find(order => order.DeliveryAgentId == nearestDeliveryAgentId);
            foreach (var i in agent)
            {
                i.OrderAssignStatus = (ServiceLocation.OrderAssignedStatus)1;
            }
            await unitOfWork.AssignDeliveryAgentRepository.AddAsync(orderAssigned);
            await unitOfWork.SaveAsync();
            return orderAssigned;
        }     
        public async Task<AgentAssign> RemoveOrderAssignedAsync(int id)
        { 
           var deletedTask= await unitOfWork.AssignDeliveryAgentRepository.DeleteAsync(id);
           await unitOfWork.SaveAsync();
           return deletedTask;
        }
        public async Task<AgentAssign> UpdateAsync(int id, UpdateOrderAssignDto orderAssignDto)
        {
            var OrderAssignDomain = await unitOfWork.AssignDeliveryAgentRepository.GetByIdAsync(id);
            if (OrderAssignDomain != null)
            {
                OrderAssignDomain.OrderId = orderAssignDto.OrderId;
                OrderAssignDomain.DeliveryAgentId = orderAssignDto.DeliveryAgentId;
                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(OrderAssignDomain);
                await unitOfWork.SaveAsync();
            }
            return OrderAssignDomain;
        }
        public async Task<int> GetDeliveryAgentsWithinDistance(double latitude, double longitude, double maxDistance)
        {
            if (maxDistance > 10)
            {
                // Notify User that Delivery Agent is not available Nearby: Push Notification
            }

            var serviceLocation = (List<ServiceLocation>) await unitOfWork.ServiceLocationRepository.GetAllAsync();

            var nearsestDeliveryAgentId = 0;
            double minDistance = 10000000;
            foreach (var i in serviceLocation)
            {
                double distanceBetweenCoordinates = CalculateDistance(latitude, longitude, i.Latitude, i.Longitude);

                if ((distanceBetweenCoordinates <= maxDistance) && (minDistance > distanceBetweenCoordinates) && i.OrderAssignStatus== ServiceLocation.OrderAssignedStatus.NotAssigned && i.AgentStatus==ServiceLocation.DeliveryAgentStatus.Availale)
                {
                    minDistance = distanceBetweenCoordinates;
                    nearsestDeliveryAgentId = i.DeliveryAgentId;
                }
            }
            return nearsestDeliveryAgentId;
        }
        public static double CalculateDistance(double startLatitude, double startLongitude, double endLatitude, double endLongitude)
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
        static double ToRadians(double degrees)
        {
            return degrees * (Math.PI / 180);
        }
        public async Task<IEnumerable<AgentAssign>> AddOrderAssignInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {
            double restaurantLatitude = 29.3993233;
            double restaurantLongitude = 76.6561982;
            List<AgentAssign> orderAssignedList = new List<AgentAssign>();
            foreach (var orderId in orderAssingInBulkRequestDto.OrderId)
            {
                var nearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(restaurantLatitude, restaurantLongitude, 10);
                var orderList = await unitOfWork.OrderRepository.AsQueryableAsync();
                orderList = orderList.Where(order => order.Id == orderId);
                foreach (var order in orderList)
                {
                    order.isOrderAssigned = (Order.IsOrderAssigned)1;
                }
                var orderAssigned = new AgentAssign
                {
                    DeliveryAgentId = nearestDeliveryAgentId,
                    OrderId = orderId,
                };
                orderAssignedList.Add(orderAssigned);
              
                var agent = unitOfWork.BusinessAdminRepository.Find(agent => agent.DeliveryAgentId == nearestDeliveryAgentId);
                foreach (var i in agent)
                {
                    i.OrderAssignStatus = (BusinessAdmin.OrderAssignedStatus)1;
                }               
            }

            foreach(AgentAssign addOrder in orderAssignedList)
            {
                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(addOrder);
                await unitOfWork.SaveAsync();
            }

            return orderAssignedList;
        }

    }
}
