using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class AgentDetailsService : IAgentDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public AgentDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto> GetAgentDetailAsync(long agentId)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == agentId);
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = agentDetail,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> AddOrEditAgentDetailsAsync(AgentDetailsDto agentDetailsDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAll()
            .FirstOrDefaultAsync(u => u.DeliveryAgentId == agentDetailsDto.DeliveryAgentId);

            bool saveResult = false;
            if (agentDetail == null)
            {
                agentDetail = new DeliveryAgentDetail();
                mapper.Map(agentDetailsDto, agentDetail);
                await unitOfWork.AgentDetailsRepository.AddAsync(agentDetail);
                saveResult = await unitOfWork.SaveAsync();
            }
            else
            {
                mapper.Map(agentDetailsDto, agentDetail);
                saveResult = await unitOfWork.SaveAsync();
            }

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success = saveResult,
                Data = agentDetail,
                Message = saveResult? StringConstant.SuccessMessage: StringConstant.ErrorMessage
            };  

        }

    }
}
