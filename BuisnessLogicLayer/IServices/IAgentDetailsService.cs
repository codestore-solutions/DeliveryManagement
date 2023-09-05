using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IAgentDetailsService
    {
        public Task<AgentDetailResponseDto?> GetAgentDetailsAsync(long agentId);
        public Task<AgentDetail?> AddDetailsAsync(AgentDetailsDto personalDetailsDto);
        public Task<AgentDetail?> UpdateDetailsAsync(long id, AgentDetailsDto agentDetailsDto);
        public Task<ResponseDto?> GetAllDetailsAsync(string? filterQuery, int? agentStatus
         , int pageNumber = 1, int limit = 10);
        public Task<AgentAllDetailsDto?> GetDetailByAgentId(long agentId);
        public Task<ResponseDto> GetMultipleAgentsList(List<long> agentIds);
        public Task<UpdateProfileCompletedDto?> UpdateProfileCompletedStatusAsync(UpdateProfileCompletedDto updateProfileCompletedDto);
        public Task<ProfileCompletedDto?> GetProfileCompletedStatusAsync(long agentId);
        public Task<bool> SoftDeleteAgentAsync(long agentId, bool isDeleted);

    }
}
