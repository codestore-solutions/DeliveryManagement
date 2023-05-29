using EntityLayer.Dtos;
using EntityLayer.Models;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace BuisnessLogicLayer.IServices
{
    public interface IBusinessAdminService
    {
        Task<IEnumerable> GetDeliveryAgentAsync(long id, OrderAssignedStatus orderAssignedStatus,DeliveryAgentStatus status, VerificationStatus verStatus, int pageNumber = 1, int limit = 1000);
        Task<VerifyAgentRequestDto> VerifyNewDeliveryAgentRequest(VerifyAgentRequestDto verifyAgentRequest);
        Task<UpdateBusinessAdminDto> UpdateDeliveryAgentAsync(int id, UpdateBusinessAdminDto updateBuisnessAdminDto);
        Task<BusinessAdmin> DeleteDeliveryAgentAsync(int id);
        Task<BusinessAdmin> UpdateVerificationSatus(long id, VerificationStatus status);
    }
}
