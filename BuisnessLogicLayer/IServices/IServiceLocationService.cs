using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IServiceLocationService
    {
        public Task<ResponseDto?> AddNewWorkingLocationAsync(AddServiceLocationDto workingLocationDto);
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
