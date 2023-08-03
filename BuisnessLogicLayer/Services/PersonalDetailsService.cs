using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DataAccessLayer.Migrations;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Text.RegularExpressions;
using static EntityLayer.Models.AgentDetail;

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

        public async Task<ResponseDto?> GetPersonalDetailsAsync(long agentId)
        {
            var agentDetail = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agentDetail == null)
            {
                return null;
            }

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = agentDetail,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto?> AddDetailsAsync(PersonalDetailsDto agentDetailsDto)
        {
            var existingDetails = await unitOfWork.PersonalDetailsRepository.GetAll()
            .FirstOrDefaultAsync(u => u.AgentId == agentDetailsDto.AgentId);
            if (existingDetails != null)
            {
                return null;
            }
            var addNewDetails = new AgentDetail();
            mapper.Map(agentDetailsDto, addNewDetails);
            addNewDetails.CreatedOn = DateTime.Now;
            addNewDetails.UpdatedOn = DateTime.Now;
            await unitOfWork.PersonalDetailsRepository.AddAsync(addNewDetails);
            bool saveResult = await unitOfWork.SaveAsync();
           
            return new ResponseDto
            {
                StatusCode       = saveResult ? 200 : 500,
                Success          = saveResult,
                Data             = addNewDetails,
                Message          = saveResult ? StringConstant.AddedMessage: StringConstant.DatabaseMessage
            };  
        }

        public async Task<ResponseDto?> UpdateDetailsAsync(long id, PersonalDetailsDto agentDetailsDto)
        {
            var agentDetail = await unitOfWork.PersonalDetailsRepository.GetByIdAsync(id);
            if (agentDetail == null)
            {
                return null;
            }
            mapper.Map(agentDetailsDto, agentDetail);
            agentDetail.UpdatedOn = DateTime.Now;
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode  = 200 ,
                Success     = true,
                Data        = agentDetail,
                Message     = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> GetAllDetailsAsync( string? filterQuery, int? agentStatus,
        int pageNumber = 1, int limit = 10)
        {    
            var personalDetailsQuery = unitOfWork.PersonalDetailsRepository.GetAll();

            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
               personalDetailsQuery = personalDetailsQuery.Where(u => u.Email.Contains(filterQuery) || u.FullName.Contains(filterQuery));
            }

            var filteredDetails = personalDetailsQuery.Join(
                unitOfWork.ServiceLocationRepository.GetAll().Where(u => u.IsActive
                && (agentStatus == null || u.AgentStatus == (ServiceLocation.AvailabilityStatus)agentStatus)),
                pd => pd.AgentId,
                sl => sl.AgentId,
                (pd, sl)=> new { PersonalDetails = pd, ServiceLocation = sl }
            );

            var totalCount = await filteredDetails.CountAsync();
            var pagedDetails = await filteredDetails.Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();

            if (pagedDetails.Count == 0)
            {
                return null;
            }

            var response = new ResponseDtoPagination
            {
                List = pagedDetails,
                Total = totalCount
            };
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data    = response,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto?> GetDetailByAgentId(long agentId)
        {
            var allDetail = await unitOfWork.PersonalDetailsRepository.GetAll().Where(u => u.AgentId == agentId).ToListAsync();
            /*.Join(
                  unitOfWork.BankDetailsRepository.GetAll(),
                  pd => pd.AgentId,
                  bd => bd.AgentId,
                  (pd, bd) => new { PersonalDetails = pd, BankDetails = bd }
                )
           .Join(
                 unitOfWork.VehicleDetailsRepository.GetAll(),
                 propa => propa.PersonalDetails.AgentId,
                 vd => vd.AgentId,
                 (p, vd) => new { p.PersonalDetails, p.BankDetails, VehicleDetails = vd }
                ).FirstOrDefaultAsync();*/
            /* .Join(
                   unitOfWork.KYCRepository.GetAll(),
                   p => p.PersonalDetails.DeliveryAgentId,
                   k => k.DeliveryAgentId,
                   (p, k) => new { p.PersonalDetails, p.BankDetails, p.VehicleDetails, KYC = k }
                  )*/

            if (allDetail ==null)
            {
                return null;
            }

            return new ResponseDto
            {
                StatusCode  = 200,
                Success     = true,
                Data        = allDetail,
                Message     = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> GetMultipleAgentsList(List<long> agentIds)
        {
            var listOfAgents = new List<Object>();

            foreach (var agentId in agentIds)
            {
                var agent = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId);
                if (agent == null)
                {                  
                    continue;
                }                
                listOfAgents.Add(agent);
            }

            return new ResponseDto
            {
                Success    = true,
                StatusCode = 200,
                Data       = listOfAgents,
                Message    = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto?> AddProfileCompletedStatusAsync(UpdateProfileCompletedDto updateProfileCompletedDto)
        {
            var agent = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == updateProfileCompletedDto.AgentId);

            if (agent == null)
            {
                return null;
            }

            agent.IsProfileCompleted = updateProfileCompletedDto.IsProfileCompleted;
            await unitOfWork.SaveAsync();

            return new ResponseDto { StatusCode = 200, Success = true, Data = updateProfileCompletedDto, Message = StringConstant.AddedMessage };
        }

        public async Task<ResponseDto?> GetProfileCompletedStatusAsync(long agentId)
        {
            var agent = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId);

            if (agent == null)
            {
                return null;
            }

            var response = new ProfileCompletedDto
            {
                AgentId = agent.AgentId,
                IsProfileCompleted = agent.IsProfileCompleted,
            };
            return new ResponseDto { StatusCode = 200, Success = true, Data = response, Message = StringConstant.SuccessMessage };
        }




    }
}
