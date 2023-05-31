using EntityLayer.Dtos;
using EntityLayer.Models;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace BuisnessLogicLayer.IServices
{
    public interface IBusinessAdminService
    {
        Task<IEnumerable> GetDeliveryAgentAsync(long id, OrderAssignedStatus? orderAssignedStatus,DeliveryAgentStatus? status, VerificationStatus? verificationStatus, int pageNumber = 1, int limit = 1000);
        Task<VerifyAgentRequestDto> VerifyNewDeliveryAgentRequest(VerifyAgentRequestDto verifyAgentRequest);
        Task<BusinessAdmin> DeleteDeliveryAgentAsync(int id);
        Task<ResponseDto> UpdateVerificationSatus(long agentId, VerificationStatus status);
    }
}
