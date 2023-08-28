using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;

namespace BusinessLogicLayer.IServices
{
    public interface IBankDetailsService
    {
        public Task<BankDetailResponseDto?> GetAsync(long agentId);
        public Task<ResponseDto?> AddDetailsAsync(BankDetailsDto bankDetailsDto);
        public Task<ResponseDto?> UpdateDetailsAsync(long id, BankDetailsDto bankDetailsDto);
    }
}
