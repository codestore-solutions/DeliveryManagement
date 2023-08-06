using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace BusinessLogicLayer.Services
{
    public class ServiceLocationService : IServiceLocationService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public ServiceLocationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto?> AddNewWorkingLocationAsync(AddServiceLocationDto serviceLocationDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == serviceLocationDto.AgentId);
            if (agentDetail == null)
            {
                return null;
            }

            var addNewWorkingLocation = new ServiceLocation();
            mapper.Map(serviceLocationDto, addNewWorkingLocation);

            string concatenatedSelectedDays = string.Join(" ", serviceLocationDto.SelectedDays);
            TimeSpan fromTime    = TimeSpan.Parse(serviceLocationDto.FromTime);
            TimeSpan toTime      = TimeSpan.Parse(serviceLocationDto.ToTime);

            addNewWorkingLocation.SelectedDays = concatenatedSelectedDays;
            addNewWorkingLocation.StartTime    = fromTime;
            addNewWorkingLocation.EndTime      = toTime;
            if (agentDetail.ServiceLocations.IsNullOrEmpty())
            {
                addNewWorkingLocation.IsActive = true;
            }
            else
            {
                addNewWorkingLocation.IsActive = false;
            }
            addNewWorkingLocation.AgentDetailId = agentDetail.Id;
            addNewWorkingLocation.AgentDetails  = agentDetail;
            agentDetail.ServiceLocations.Add(addNewWorkingLocation);

            await unitOfWork.ServiceLocationRepository.AddAsync(addNewWorkingLocation);
            bool saveResult = await unitOfWork.SaveAsync();
       
            return new ResponseDto
            {
                StatusCode  = 200,
                Success     = true,
                Data        = addNewWorkingLocation,
                Message     = saveResult ? StringConstant.AddedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> GetAllWorkingLocationsAsync(long agentId)
        {
            var allLocations = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if(allLocations == null || allLocations.ServiceLocations.IsNullOrEmpty())
            {
                return null;
            }

            return new ResponseDto
            {
                StatusCode  = 200,
                Success     = true,
                Data        = allLocations.ServiceLocations,
                Message     = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto?> DeleteWorkingLocationAsync(long serviceLocationId)
        {
            var workingLocation = await unitOfWork.ServiceLocationRepository.DeleteAsync(serviceLocationId);
            if(workingLocation == null)
            {
                return null;
            }
            bool saveResult = await unitOfWork.SaveAsync();        
            return new ResponseDto
            {
                StatusCode   = saveResult ? 200 : 500,
                Success      = saveResult,
                Data         = workingLocation,
                Message      = saveResult ? StringConstant.DeletedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> UpdateWorkingLocationAsync(long serviceLocationId, UpdateWorkingLocationDto updateWorkingLocationDto)
        {
            var serviceLocation = await unitOfWork.ServiceLocationRepository.GetByIdAsync(serviceLocationId);

            if(serviceLocation == null) 
            {
                return null;
            }

            mapper.Map(updateWorkingLocationDto, serviceLocation);
            TimeSpan fromTime = TimeSpan.Parse(updateWorkingLocationDto.FromTime);
            TimeSpan toTime = TimeSpan.Parse(updateWorkingLocationDto.ToTime);
            string concatenatedSelectedDays = string.Join(" ", updateWorkingLocationDto.SelectedDays);

            serviceLocation.StartTime = fromTime;
            serviceLocation.EndTime = toTime;
            serviceLocation.SelectedDays = concatenatedSelectedDays;
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = serviceLocation,
                Message    = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto)
        {
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == activeAddressDto.AgentId);

            if (agentDetails == null)
            {
                return null;
            }
            var serviceLocations = agentDetails.ServiceLocations;
            var responseObject = new object();
            foreach (var serviceLocation in serviceLocations)
            {
                if (serviceLocation.Id == activeAddressDto.ServiceLocationId)
                {
                    responseObject = serviceLocation;
                    serviceLocation.IsActive = activeAddressDto.IsActive;
                }
                else
                {
                    serviceLocation.IsActive = false;
                }
            }

            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = responseObject,
                Message = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == statusDto.AgentId);

            if (agent == null) { return null; }
            var responseDto = new AvailabilityStatusDto();

            agent.AgentStatus = (EnumConstants.AvailabilityStatus)statusDto.AgentStatus;                        
            bool saveResult = await unitOfWork.SaveAsync();
            responseDto.AgentStatus = (AvailabilityStatusDto.AvailabilityStatus)statusDto.AgentStatus;

            return new ResponseDto
            {
                StatusCode  = saveResult ? 200 : 500,
                Success     = saveResult,
                Data        = responseDto,
                Message     = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage,
            };
        }

        public async Task<ResponseDto?> GetAgentAvailabilityStatusAsync(long agentId)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if(agent == null)
            {
                return null;
            }
            var responseDto = new AvailabilityStatusDto
            {
                AgentStatus = (AvailabilityStatusDto.AvailabilityStatus)agent.AgentStatus
            };

            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = responseDto,
                Message    = StringConstant.SuccessMessage,
            };
        }

        public async Task<ResponseDto?> UpdateVerificationStatusAsync(UpdateVerificationStatusDto updateVerificationStatusDto)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == updateVerificationStatusDto.AgentId);
            if (agent == null) { return null; }
           
            agent.verificationStatus = (EnumConstants.VerificationStatus)updateVerificationStatusDto.verificationStatus;
            await unitOfWork.SaveAsync();
            return new ResponseDto { StatusCode = 200, Success = true, Data = updateVerificationStatusDto, Message = StringConstant.UpdatedMessage };
        }

        public async Task<ResponseDto?> GetVerificationStatusAsync(long agentId)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agent == null)
            {
                return null;
            }
            var response = new VerificationStatusDto
            {
                verificationStatus = (VerificationStatusDto.VerificationStatus)agent.verificationStatus
            };
            return new ResponseDto {Success = true, StatusCode = 200, Data = response, Message = StringConstant.SuccessMessage };
        }
       
    }

}





