using EntityLayer.Dtos;
using EntityLayer.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IAssignDeliveryAgentService
    {
       Task<IEnumerable<AssignDeliveryAgent>> AddOrderAssignInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto);
       Task<IEnumerable<AssignDeliveryAgent>> GetAllAsync(int pageNumber=1, int limit=1000);
       Task<ResponseDto> assignAgentManuallyAsync(AssignManuallyDto assignManuallyDto);
       Task RemoveOrderAssignedAsync(long id);
       Task<ResponseDto> UpdateAsync(long id, UpdateAgentRequestDto orderAssignDto);
       Task<ResponseDto> AddNearsetDeliveryAgentAsync(AgentAssignRequestDto agentAssignRequestDto);

    }
}
