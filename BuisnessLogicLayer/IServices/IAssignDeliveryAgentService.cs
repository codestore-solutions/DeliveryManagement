using EntityLayer.Dtos;
using EntityLayer.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IAssignDeliveryAgentService
    {
       Task<IEnumerable<AgentAssign>> AddOrderAssignInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto);
       Task<IEnumerable<AgentAssign>> GetAllAsync(int pageNumber=1, int limit=1000);
      // Task<OrderAssignRequestDto> CreateOrderAsync(OrderAssignRequestDto orderAssignRequestDto);
       Task<AgentAssign> RemoveOrderAssignedAsync(int id);
       Task<AgentAssign> UpdateAsync(int id, UpdateOrderAssignDto orderAssignDto);
       Task<AgentAssign> AddNearsetDeliveryAgentAsync(AgentAssignRequestDto agentAssignRequestDto);

    }
}
