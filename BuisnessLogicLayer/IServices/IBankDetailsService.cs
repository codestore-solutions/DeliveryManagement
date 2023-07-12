using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IBankDetailsService
    {
        public Task<ResponseDto> GetAsync(long agentId);
        public Task<ResponseDto> AddDetailsAsync(BankDetailsDto bankDetailsDto);
        public Task<ResponseDto?> UpdateDetailsAsync(long id, BankDetailsDto bankDetailsDto);
    }
}
