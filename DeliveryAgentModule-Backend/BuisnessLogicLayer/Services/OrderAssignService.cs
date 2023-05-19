using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Dtos;
using EntityLayer.Models;
using static EntityLayer.Models.BusinessAdmin;

namespace BusinessLogicLayer.Services
{
    public class OrderAssignService : IOrderAssignService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public OrderAssignService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<OrderAssign>> GetAllAsync(int pageNumber=1, int limit=1000)
        {
            var allItems = await unitOfWork.OrderAssignRepository.GetAllAsync();
            //pagination
            var paginatedItems = allItems.Skip((pageNumber - 1) * limit).Take(limit);
            return paginatedItems;
        }

        public async Task<OrderAssignRequestDto> CreateOrderAsync(OrderAssignRequestDto orderAssignRequestDto)
        {
            var orderDomainModel = mapper.Map<OrderAssign>(orderAssignRequestDto);
            await unitOfWork.OrderAssignRepository.AddAsync(orderDomainModel);
            await unitOfWork.SaveAsync();
            return mapper.Map<OrderAssignRequestDto>(orderDomainModel);
        }

        public async Task<OrderAssign> AddNearsetDeliveryAgentAsync(OrderAssignRequestDto orderAssignRequestDto)
        {
            double restaurantLatitude = 29.3993233;
            double restaurantLongitude = 76.6561982;
            var nearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(restaurantLatitude, restaurantLongitude, 10);
            var orderAssigned = new OrderAssign
            {
                DeliveryAgentId = nearestDeliveryAgentId,
                OrderId = orderAssignRequestDto.OrderId,
            };
            var agent = unitOfWork.BusinessAdminRepository.Find(order => order.DeliveryAgentId == nearestDeliveryAgentId);
            foreach (var i in agent)
            {
                i.OrderAssignStatus = (OrderAssignedStatus)1;
            }
            await unitOfWork.OrderAssignRepository.AddAsync(orderAssigned);
            await unitOfWork.SaveAsync();
            return orderAssigned;
        }

       
        public async Task<OrderAssign> RemoveOrderAssignedAsync(int id)
        { 
           var deletedTask= await unitOfWork.OrderAssignRepository.DeleteAsync(id);
           await unitOfWork.SaveAsync();
           return deletedTask;
        }
        public async Task<OrderAssign> UpdateAsync(int id, UpdateOrderAssignDto orderAssignDto)
        {
            var OrderAssignDomain = await unitOfWork.OrderAssignRepository.GetByIdAsync(id);
            if (OrderAssignDomain != null)
            {
                OrderAssignDomain.OrderId = orderAssignDto.OrderId;
                OrderAssignDomain.DeliveryAgentId = orderAssignDto.DeliveryAgentId;
                await unitOfWork.OrderAssignRepository.AddAsync(OrderAssignDomain);
                await unitOfWork.SaveAsync();
            }
            return OrderAssignDomain;
        }


        public async Task<int> GetDeliveryAgentsWithinDistance(double latitude, double longitude, double maxDistance)
        {
            if (maxDistance > 10)
            {
                // Notify User that Delivery Agent is not available Nearby
            }

            var serviceLocation = (List<ServiceLocation>) await unitOfWork.ServiceLocationRepository.GetAllAsync();

            var nearsestDeliveryAgentId = 0;
            double minDistance = 10000000;
            foreach (var i in serviceLocation)
            {
                double distanceBetweenCoordinates = CalculateDistance(latitude, longitude, i.Latitude, i.Longitude);

                if (distanceBetweenCoordinates <= maxDistance && minDistance > distanceBetweenCoordinates)
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
    }
}
