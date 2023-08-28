using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;

namespace BusinessLogicLayer.IServices
{
    public interface IServiceLocationService
    {
        public Task<ResponseDto?> AddNewWorkingLocationAsync(ServiceLocationDto workingLocationDto);
        public Task<ResponseDto?> GetAllWorkingLocationsAsync(long deliveryAgentId);
        public Task<ResponseDto?> DeleteWorkingLocationAsync(long serviceLocationId);
        public Task<ResponseDto?> UpdateWorkingLocationAsync(long serviceLocationId, UpdateWorkingLocationDto updateWorkingLocationDto);
        public Task<ResponseDto?> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto);
        public Task<ResponseDto?> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto);
        public Task<ResponseDto?> GetAgentAvailabilityStatusAsync(long agentId);
        public Task<ResponseDto?> UpdateVerificationStatusAsync(UpdateVerificationStatusDto updateVerificationStatusDto);
        public Task<ResponseDto?> GetVerificationStatusAsync(long agentId);
    }
}
