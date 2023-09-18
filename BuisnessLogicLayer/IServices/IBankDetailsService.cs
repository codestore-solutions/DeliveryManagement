using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IBankDetailsService
    {
        public Task<BankDetailResponseDto?> GetAsync(long agentId, bool masked);
        public Task<BankDetail?> AddDetailsAsync(BankDetailsDto bankDetailsDto);
        public Task<BankDetail?> UpdateDetailsAsync(long id, BankDetailsDto bankDetailsDto);
    }
}
