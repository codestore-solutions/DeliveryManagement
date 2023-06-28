using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace BusinessLogicLayer.IServices
{
    public interface IBusinessAdminService
    {
        Task<ResponseDto> GetAllDeliveryAgentAsync(long businessId, string? filterOn , string? filterQuery ,OrderAssignedStatus? orderAssignedStatus, DeliveryAgentStatus? status,
            int pageNumber = 1, int limit = 10);
        Task<VerifyAgentRequestDto> VerifyNewDeliveryAgentRequest(VerifyAgentRequestDto verifyAgentRequest);
        Task DeleteDeliveryAgentAsync(long id);
        public Task<ResponseDto> GetMultipleAgentsAsync(List<long> DeliveryAgentIds);
       // Task<ResponseDto> UpdateVerificationSatus(long agentId, VerificationStatus status);
    }
}
