using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IVehicleDetailsService
    {
        public Task<ResponseDto> GetAsync(long agentId);
        public Task<ResponseDto> AddDetailsAsync(VehicleDetailsDto vehicleDetailsDto);

        public Task<ResponseDto?> UpdateDetailsAsync(long id, VehicleDetailsDto vehicleDetailsDto);
    }
}
