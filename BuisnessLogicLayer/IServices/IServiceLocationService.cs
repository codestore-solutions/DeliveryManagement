using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IServiceLocationService
    {
        public Task<ServiceLocation?> AddNewWorkingLocationAsync(ServiceLocationDto workingLocationDto);
        public Task<IEnumerable<ServiceLocation>?> GetAllWorkingLocationsAsync(long deliveryAgentId);
        public Task<ServiceLocation?> DeleteWorkingLocationAsync(long serviceLocationId);
        public Task<ServiceLocation?> UpdateWorkingLocationAsync(long serviceLocationId, UpdateWorkingLocationDto updateWorkingLocationDto);
        public Task<ResponseDto?> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto);
        public Task<AvailabilityStatusDto?> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto);
        public Task<AvailabilityStatusDto?> GetAgentAvailabilityStatusAsync(long agentId);
        public Task<UpdateVerificationStatusDto?> UpdateVerificationStatusAsync(UpdateVerificationStatusDto updateVerificationStatusDto);
        public Task<VerificationStatusDto?> GetVerificationStatusAsync(long agentId);
    }
}
