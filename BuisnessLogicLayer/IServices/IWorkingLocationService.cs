using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IWorkingLocationService
    {
        public Task<ResponseDto> AddNewWorkingLocationAsync(AddNewWorkingLocationDto workingLocationDto);
        public Task<ResponseDto> GetAllWorkingLocationsAsync(long deliveryAgentId);
        public Task<ResponseDto?> DeleteWorkingLocationAsync(long deliveryAgentId, long serviceLocationId);
    }
}
