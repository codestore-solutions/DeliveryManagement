using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;

namespace BusinessLogicLayer.IServices
{
    public interface IAgentDetailsService
    {
        public Task<AgentDetailResponseDto?> GetAgentDetailsAsync(long agentId);
        public Task<ResponseDto> AddDetailsAsync(AgentDetailsDto personalDetailsDto);
        public Task<ResponseDto> UpdateDetailsAsync(long id, AgentDetailsDto agentDetailsDto);
        public Task<ResponseDto?> GetAllDetailsAsync(string? filterQuery, int? agentStatus
         , int pageNumber = 1, int limit = 10);
        public Task<ResponseDto?> GetDetailByAgentId(long agentId);
        public Task<ResponseDto> GetMultipleAgentsList(List<long> agentIds);
        public Task<ResponseDto?> UpdateProfileCompletedStatusAsync(UpdateProfileCompletedDto updateProfileCompletedDto);
        public Task<ResponseDto?> GetProfileCompletedStatusAsync(long agentId);
        public Task<bool> SoftDeleteAgentAsync(long agentId, bool isDeleted);

    }
}
