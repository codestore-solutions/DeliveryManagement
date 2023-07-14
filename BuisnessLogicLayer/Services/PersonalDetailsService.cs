using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
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

        public async Task<ResponseDto> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto)
        {
            var agent = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == statusDto.DeliveryAgentId);

            if(agent != null)
            {
                agent.AgentStatus = (PersonalDetails.AvailabilityStatus)statusDto.AgentStatus;
                await unitOfWork.SaveAsync();
            }

            return new ResponseDto
            {
                StatusCode      = 200,
                Success         = true,
                Data            = agent,
                Message = StringConstant.UpdatedMessage,
            };
        }

        public async Task<ResponseDto> GetAllDetailsAsync()
        {
            var allDetails = await unitOfWork.PersonalDetailsRepository.GetAll()
            .Join(
                 unitOfWork.ServiceLocationRepository.GetAll().Where(u => u.IsActive == true),             
                 pd => pd.DeliveryAgentId,
                 sl => sl.DeliveryAgentId,
                 (pd, sl) => new { PersonalDetails = pd, ServiceLocation = sl}
                 ).ToListAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = allDetails,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> GetDetailByAgentId(long agentId)
        {
            var allDetail = await unitOfWork.PersonalDetailsRepository.GetAll().Where(u => u.DeliveryAgentId == agentId)
            .Join(
                  unitOfWork.BankDetailsRepository.GetAll(),
                  pd => pd.DeliveryAgentId,
                  bd => bd.DeliveryAgentId,
                  (pd, bd) => new { PersonalDetails = pd, BankDetails = bd }
                )
           .Join(
                 unitOfWork.VehicleDetailsRepository.GetAll(),
                 propa => propa.PersonalDetails.DeliveryAgentId,
                 vd => vd.DeliveryAgentId,
                 (p, vd) => new { p.PersonalDetails, p.BankDetails, VehicleDetails = vd }
                )
          /* .Join(
                 unitOfWork.KYCRepository.GetAll(),
                 p => p.PersonalDetails.DeliveryAgentId,
                 k => k.DeliveryAgentId,
                 (p, k) => new { p.PersonalDetails, p.BankDetails, p.VehicleDetails, KYC = k }
                )*/
                .ToListAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = allDetail,
                Message = StringConstant.SuccessMessage
            };
        }

    }
}
