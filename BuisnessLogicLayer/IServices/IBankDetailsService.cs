using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IBankDetailsService
    {
        public Task<BankDetailResponseDto?> GetAsync(long agentId);
        public Task<ResponseDto?> AddDetailsAsync(BankDetailsDto bankDetailsDto);
        public Task<ResponseDto?> UpdateDetailsAsync(long id, BankDetailsDto bankDetailsDto);
    }
}
