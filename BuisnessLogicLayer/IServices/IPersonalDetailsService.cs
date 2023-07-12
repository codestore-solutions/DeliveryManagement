using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IPersonalDetailsService
    {
        public Task<ResponseDto> GetPersonalDetailsAsync(long agentId);
        public Task<ResponseDto> AddDetailsAsync(PersonalDetailsDto personalDetailsDto);
        public Task<ResponseDto?> UpdateDetailsAsync(long id, PersonalDetailsDto agentDetailsDto);
    }
}
