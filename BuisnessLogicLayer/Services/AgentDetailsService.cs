using AutoMapper;
using Azure;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
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

        public async Task<AgentDetailResponseDto?> GetAgentDetailsAsync(long agentId)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agentDetail == null) { return null; }
            
            var agentDetailResponse = new AgentDetailResponseDto();
            mapper.Map(agentDetail, agentDetailResponse);
            return agentDetailResponse;
        }

        public async Task<ResponseDto> AddDetailsAsync(AgentDetailsDto agentDetailsDto)
        {
            // Edge Case : Check if details already exists or not.
            var existingDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == agentDetailsDto.AgentId);

            // Details already exists.
            if (existingDetails != null) { return new ErrorResponseDto { StatusCode = 400, Success = false, Message = StringConstant.ExistingMessage }; }
           
            var addNewDetails = new AgentDetail();
            addNewDetails.CreatedOn = addNewDetails.UpdatedOn = DateTime.Now;
            mapper.Map(agentDetailsDto, addNewDetails);

            await unitOfWork.AgentDetailsRepository.AddAsync(addNewDetails);
            await unitOfWork.SaveAsync();

            return new ResponseDto { StatusCode = 200, Success = true, Data = addNewDetails, Message = StringConstant.AddedMessage };
        }

        public async Task<ResponseDto> UpdateDetailsAsync(long id, AgentDetailsDto agentDetailsDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetByIdAsync(id);

            // if agent does not exist.
            if (agentDetail == null) { return new ErrorResponseDto { StatusCode = 404, Message = StringConstant.ResourceNotFoundError, Success = false }; }

            agentDetail.UpdatedOn = DateTime.Now;
            mapper.Map(agentDetailsDto, agentDetail);
            
            await unitOfWork.SaveAsync();
            return new ResponseDto { StatusCode = 200 , Success = true, Data = agentDetail, Message = StringConstant.UpdatedMessage };
        }

        public async Task<ResponseDto?> GetAllDetailsAsync(string? filterQuery, int? agentStatus,
        int pageNumber = 1, int limit = 10)
        {
            var agentDetailsQuery = unitOfWork.AgentDetailsRepository.GetAllAsQueryable();

            // Filter on the basis of name and email. 
            if (!string.IsNullOrWhiteSpace(filterQuery))
            {
                agentDetailsQuery = agentDetailsQuery.Where(u => u.Email.Contains(filterQuery) || u.FullName.Contains(filterQuery));
            }
            var filteredDetails = agentDetailsQuery.Where(u => u.IsProfileCompleted && !u.IsDeleted
            && (agentStatus == null || u.AgentStatus == (EnumConstants.AvailabilityStatus)agentStatus));

            var totalCount = await filteredDetails.CountAsync();
            var pagedDetails = await filteredDetails.Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();

            // If We do not have any data in db.
            if (pagedDetails.Count == 0) { return null; }

            var response = new ResponseDtoPagination
            {
                List = pagedDetails,
                Total = totalCount
            };
            return new ResponseDto { StatusCode = 200, Success = true, Data = response, Message = StringConstant.SuccessMessage };
        }

        // Fetching all details of agents like bank, vehicle, personal from db and masking sensitive data.
        public async Task<ResponseDto?> GetDetailByAgentId(long agentId)
        {
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agentDetails == null)
            {
                return null;
            }
            var response = new AgentAllDetailsDto();
            mapper.Map(agentDetails, response);
            if (agentDetails.BankDetails != null && agentDetails.VehicleDetails != null)
            {
                var decryptedIfsc = AesED.Decrypt(agentDetails.BankDetails.IFSCCode);
                var decryptedAccountNumber = AesED.Decrypt(agentDetails.BankDetails.AccountNumber);
                response.BankDetails.IFSCCode = MaskData.SensitiveInfo(decryptedIfsc);
                response.BankDetails.AccountNumber = MaskData.SensitiveInfo(decryptedAccountNumber);
                response.VehicleDetails.RegistrationNumber = MaskData.SensitiveInfo(agentDetails.VehicleDetails.RegistrationNumber);
            }

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = response,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> GetMultipleAgentsList(List<long> agentIds)
        {
            var listOfAgents = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .Where(u => agentIds.Contains(u.AgentId)).Select(u => new
            {
                u.AgentId,
                u.FullName
            }).ToListAsync();

            return new ResponseDto { StatusCode = 200, Success = true, Data = listOfAgents, Message = StringConstant.SuccessMessage };
        }

        public async Task<ResponseDto?> UpdateProfileCompletedStatusAsync(UpdateProfileCompletedDto updateProfileCompletedDto)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == updateProfileCompletedDto.AgentId);

            if (agent == null) { return null; }

            agent.IsProfileCompleted = updateProfileCompletedDto.IsProfileCompleted;
            await unitOfWork.SaveAsync();

            return new ResponseDto { StatusCode = 200, Success = true, Data = updateProfileCompletedDto, Message = StringConstant.UpdatedMessage };
        }

        public async Task<ResponseDto?> GetProfileCompletedStatusAsync(long agentId)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);

            if (agent == null) { return null; }

            var response = new ProfileCompletedDto
            {
                AgentId = agent.AgentId,
                IsProfileCompleted = agent.IsProfileCompleted,
            };
            return new ResponseDto { StatusCode = 200, Success = true, Data = response, Message = StringConstant.SuccessMessage };
        }

        public async Task<bool> SoftDeleteAgentAsync(long agentId, bool isDeleted)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agent != null)
            {
                // Mark agent as Inactive
                agent.IsDeleted = isDeleted;
                await unitOfWork.SaveAsync();
                return true;
            }
            return false;
        }

    }
}
