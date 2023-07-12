using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class PersonalDetailsService : IPersonalDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PersonalDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto> GetPersonalDetailsAsync(long agentId)
        {
            var agentDetail = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == agentId);
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = agentDetail,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> AddDetailsAsync(PersonalDetailsDto agentDetailsDto)
        {   
            var addNewDetails = new PersonalDetails();
            mapper.Map(agentDetailsDto, addNewDetails);
            await unitOfWork.PersonalDetailsRepository.AddAsync(addNewDetails);
            bool saveResult = await unitOfWork.SaveAsync();
           
            return new ResponseDto
            {
                StatusCode       = saveResult ? 200 : 500,
                Success          = saveResult,
                Data             = addNewDetails,
                Message          = saveResult ? StringConstant.SuccessMessage: StringConstant.ErrorMessage
            };  
        }

        public async Task<ResponseDto?> UpdateDetailsAsync(long id, PersonalDetailsDto agentDetailsDto)
        {
            var agentDetail = await unitOfWork.PersonalDetailsRepository.GetByIdAsync(id);
            bool saveResult = false;

            if (agentDetail == null)
            {
                return null;
            }

            mapper.Map(agentDetailsDto, agentDetail);
            saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode  = saveResult ? 200 : 500,
                Success     = saveResult,
                Data        = saveResult? agentDetail: StringConstant.DatabaseMessage,
                Message     = saveResult ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
            };
        }


    }
}
