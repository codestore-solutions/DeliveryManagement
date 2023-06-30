using EntityLayer.Common;
using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IAgentDetailsService
    {
        public Task<ResponseDto> GetAgentDetailAsync(long agentId);
        public Task<ResponseDto> AddOrEditAgentDetailsAsync(AgentDetailsDto agentDetailsDto);
    }
}
