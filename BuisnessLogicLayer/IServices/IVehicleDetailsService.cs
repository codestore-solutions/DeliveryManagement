using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;

namespace BusinessLogicLayer.IServices
{
    public interface IVehicleDetailsService
    {
        public Task<VehicleDetailResponseDto?> GetAsync(long agentId);
        public Task<ResponseDto?> AddDetailsAsync(VehicleDetailsDto vehicleDetailsDto);
        public Task<ResponseDto?> UpdateDetailsAsync(long id, VehicleDetailsDto vehicleDetailsDto);
    }
}
