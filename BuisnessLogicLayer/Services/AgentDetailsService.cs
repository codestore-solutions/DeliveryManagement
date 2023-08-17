using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DataAccessLayer.Migrations;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;


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

        public async Task<AgentDetailResponseDto?> GetPersonalDetailsAsync(long agentId)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agentDetail == null)
            {
                return null;
            }
            var agentDetailResponse = new AgentDetailResponseDto();
            mapper.Map(agentDetail, agentDetailResponse);
            return agentDetailResponse;
        }

        public async Task<ResponseDto> AddDetailsAsync(AgentDetailsDto agentDetailsDto)
        {
            var existingDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == agentDetailsDto.AgentId);

            // Handling Duplicate Record 
            if (existingDetails != null)
            {
                return new ErrorResponseDto { StatusCode = 400, Success = false, Message = StringConstant.ExistingMessage};
            }
            var addNewDetails = new AgentDetail();
            mapper.Map(agentDetailsDto, addNewDetails);
            addNewDetails.CreatedOn = DateTime.Now;
            addNewDetails.UpdatedOn = DateTime.Now;

            await unitOfWork.AgentDetailsRepository.AddAsync(addNewDetails);
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = saveResult? 200 : 500,
                Success    = saveResult,
                Data       = addNewDetails,
                Message    = saveResult ? StringConstant.AddedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto> UpdateDetailsAsync(long id, AgentDetailsDto agentDetailsDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetByIdAsync(id);
            if (agentDetail == null)
            {
                return new ErrorResponseDto { StatusCode = 404, Message = StringConstant.ResourceNotFoundError, Success = false};
            }
            mapper.Map(agentDetailsDto, agentDetail);
            agentDetail.UpdatedOn = DateTime.Now;
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode  = saveResult ? 200 : 500 ,
                Success     = saveResult,
                Data        = agentDetail,
                Message     = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> GetAllDetailsAsync( string? filterQuery, int? agentStatus,
        int pageNumber = 1, int limit = 10)
        {
            var agentDetailsQuery = unitOfWork.AgentDetailsRepository.GetAllAsQueryable();

            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
               agentDetailsQuery = agentDetailsQuery.Where(u => u.Email.Contains(filterQuery) || u.FullName.Contains(filterQuery));
            }
            var filteredDetails = agentDetailsQuery.Where(u => u.IsProfileCompleted
            && (agentStatus == null || u.AgentStatus == (EnumConstants.AvailabilityStatus)agentStatus));
          
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
                Success    = true,
                Data       = response,
                Message    = StringConstant.SuccessMessage
            };
        } 

        public async Task<ResponseDto?> GetDetailByAgentId(long agentId)
        {
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if(agentDetails == null) 
            { 
                return null;
            }

            return new ResponseDto
            {
                StatusCode  = 200,
                Success     = true,
                Data        = agentDetails,
                Message     = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> GetMultipleAgentsList(List<long> agentIds)
        {
            var listOfAgents = new List<Object>();

            foreach (var agentId in agentIds)
            {
                var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
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
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == updateProfileCompletedDto.AgentId);

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
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);

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
