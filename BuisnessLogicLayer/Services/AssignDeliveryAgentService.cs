using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
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

        public async Task<IEnumerable<AssignDeliveryAgent>> GetAllAsync(int pageNumber=1, int limit=1000)
        {
            var allItems = await unitOfWork.AssignDeliveryAgentRepository.GetAll().Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();    
            return allItems;
        }
        public async Task<ResponseDto> assignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            var assignNewAgent = mapper.Map<AssignDeliveryAgent>(assignManuallyDto);
            await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignNewAgent);
            bool res = await unitOfWork.SaveAsync();
            var response = new ResponseDto()
            {
                StatusCode = res?200:500,
                Success    = res,
                Data       = res?assignNewAgent:StringConstant.ErrorMessage,
                Message    = res?StringConstant.SuccessMessage:StringConstant.ErrorMessage
            };
            return response;
        } 
        public async Task<ResponseDto> AddNearsetDeliveryAgentAsync(AgentAssignRequestDto agentAssignRequestDto)
        {
            double adminLatitude = 29.3993233;
            double adminLongitude = 76.6561982;
            var nearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(adminLatitude, adminLongitude, 10);
            var orderList = await unitOfWork.OrderRepository.GetAll().Where(order => order.Id == agentAssignRequestDto.OrderId).ToListAsync();
            foreach (var order in orderList)
            {
                order.isOrderAssigned = (Order.IsOrderAssigned)1;
            }
            
            var assignedAgent = new AssignDeliveryAgent
            {
                BuisnessId      = agentAssignRequestDto.BusinessId,
                DeliveryAgentId = nearestDeliveryAgentId,
                OrderId         = agentAssignRequestDto.OrderId
            };
            var agent = unitOfWork.ServiceLocationRepository.GetAll().Where(o => o.DeliveryAgentId == nearestDeliveryAgentId);
            foreach (var i in agent)
            {
                i.OrderAssignStatus = (ServiceLocation.OrderAssignedStatus)1;
            }
            await unitOfWork.AssignDeliveryAgentRepository.AddAsync(assignedAgent);
            await unitOfWork.SaveAsync();

            var response = new ResponseDto()
            {
                StatusCode = 200,
                Success = true,
                Data = assignedAgent,
                Message = "agent assigned successfully"
            };
            return response;
        }
        public async Task<IEnumerable<AssignDeliveryAgent>> AddOrderAssignInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {
            double restaurantLatitude = 29.3993233;
            double restaurantLongitude = 76.6561982;
            List<AssignDeliveryAgent> orderAssignedList = new List<AssignDeliveryAgent>();
            foreach (var orderId in orderAssingInBulkRequestDto.OrderId)
            {
                var nearestDeliveryAgentId = await GetDeliveryAgentsWithinDistance(restaurantLatitude, restaurantLongitude, 10);
                var orderList = await unitOfWork.OrderRepository.GetAll().Where(order => order.Id == orderId).ToListAsync();
                foreach (var order in orderList)
                {
                    order.isOrderAssigned = (Order.IsOrderAssigned)1;
                }
                var orderAssigned = new AssignDeliveryAgent
                {
                    DeliveryAgentId = nearestDeliveryAgentId,
                    OrderId = orderId,
                };
                orderAssignedList.Add(orderAssigned);

                var agent = unitOfWork.BusinessAdminRepository.GetAll().Where(agent => agent.DeliveryAgentId == nearestDeliveryAgentId);
                foreach (var i in agent)
                {
                    i.OrderAssignStatus = (BusinessAdmin.OrderAssignedStatus)1;
                }
            }

            foreach (AssignDeliveryAgent addOrder in orderAssignedList)
            {
                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(addOrder);
                await unitOfWork.SaveAsync();
            }
            return orderAssignedList;
        }
        public async Task<ResponseDto> UpdateAsync(long id, UpdateAgentRequestDto updateAgentRequestDto)
        {
            var agentNeedsToBeUpdated = await unitOfWork.AssignDeliveryAgentRepository.GetAll().FirstOrDefaultAsync(id => id.DeliveryAgentId == updateAgentRequestDto.DeliveryAgentId);
            bool res = false;
            if (agentNeedsToBeUpdated != null)
            {
                agentNeedsToBeUpdated.OrderId = updateAgentRequestDto.OrderId;
                agentNeedsToBeUpdated.DeliveryAgentId = updateAgentRequestDto.DeliveryAgentId;
                await unitOfWork.AssignDeliveryAgentRepository.AddAsync(agentNeedsToBeUpdated);
                res = await unitOfWork.SaveAsync();
            }
            
            var response = new ResponseDto()
            {
                StatusCode = res ? 200 : 500,
                Success = res,
                Data = res ? agentNeedsToBeUpdated : StringConstant.ErrorMessage,
                Message = res ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
            };
            return response;
        }
        public async Task RemoveOrderAssignedAsync(long agentId)
        {
            var unassignAgent = await unitOfWork.AssignDeliveryAgentRepository.GetAll().FirstOrDefaultAsync(id=>id.DeliveryAgentId== agentId);
            await unitOfWork.AssignDeliveryAgentRepository.DeleteAsync(unassignAgent.Id);
            await unitOfWork.SaveAsync();
        }
        public async Task<long> GetDeliveryAgentsWithinDistance(double latitude, double longitude, double maxDistance)
        {
            if (maxDistance > 10)
            {
                // Notify User that Delivery Agent is not available Nearby: Push Notification
            }

            var serviceLocation = await unitOfWork.ServiceLocationRepository.GetAll().ToListAsync();
            long nearsestDeliveryAgentId = 0;
            double minDistance = 10000000;
            foreach (var i in serviceLocation)
            {
                double distanceBetweenCoordinates = CalculateDistance(latitude, longitude, i.Latitude, i.Longitude);

                if ((distanceBetweenCoordinates <= maxDistance) && (minDistance > distanceBetweenCoordinates) && i.OrderAssignStatus == ServiceLocation.OrderAssignedStatus.NotAssigned && i.AgentStatus == ServiceLocation.DeliveryAgentStatus.Availale)
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
