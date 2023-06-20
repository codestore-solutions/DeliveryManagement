using BusinessLogicLayer.Services;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IAssignDeliveryAgentService
    {
       Task<ResponseDto> AddOrderAssignInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto);
       Task<IEnumerable<AssignDeliveryAgent>> GetAllAsync(int pageNumber=1, int limit=10);
       Task<ResponseDto> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto);
       Task RemoveOrderAssignedAsync(long id);
       Task<ResponseDto> UpdateAsync(long id, UpdateAgentRequestDto orderAssignDto);
       Task<ResponseDto> AddNearsetDeliveryAgentAsync(AssignAgentAutomaticallyDto automaticallyDto);
       public Task<ResponseDto> BulkAgentAssignManuallyAsync(BulkAssignManuallyDto bulkAssignManuallyDto);

    }
}
