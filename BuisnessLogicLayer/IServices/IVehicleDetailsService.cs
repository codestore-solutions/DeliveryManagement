using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IVehicleDetailsService
    {
        public Task<VehicleDetailResponseDto?> GetAsync(long agentId, bool masked);
        public Task<VehicleDetail?> AddDetailsAsync(VehicleDetailsDto vehicleDetailsDto);
        public Task<VehicleDetail?> UpdateDetailsAsync(long id, VehicleDetailsDto vehicleDetailsDto);
    }
}
