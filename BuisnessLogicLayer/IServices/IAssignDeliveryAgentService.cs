using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;

namespace BusinessLogicLayer.IServices
{
    public interface IAssignDeliveryAgentService
    {
        public Task<ResponseDto> GetAllAsync(int pageNumber = 1, int limit = 10);
        public Task<ResponseDto> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto);
        public Task<IEnumerable<AutomaticallyAssignResponseDto>?> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto);
        public Task<ResponseDto?> AcceptOrderAsync(AcceptRejectOrderDto acceptRejectOrderDto, string token);
        public Task<DeliveredOrRejectedOrdersCountDto?> GetDeliveredOrRejectedOrdersCountAsync(long agentId);
        public Task<ResponseDto?> UpdatePickupOrDeliveryStatusAsync(UpdatePickupOrDeliveryStatusDto pickupOrDeliveryStatusDto);
    }
}
