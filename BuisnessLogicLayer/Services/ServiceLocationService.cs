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

        public async Task<ResponseDto?> AddNewWorkingLocationAsync(AddServiceLocationDto workingLocationDto)
        { 
            var addNewWorkingLocation = new ServiceLocation();
            mapper.Map(workingLocationDto, addNewWorkingLocation);

            string concatenatedSelectedDays = string.Join(" ", workingLocationDto.SelectedDays);
            TimeSpan fromTime    = TimeSpan.Parse(workingLocationDto.FromTime);
            TimeSpan toTime      = TimeSpan.Parse(workingLocationDto.ToTime);

            addNewWorkingLocation.SelectedDays = concatenatedSelectedDays;
            addNewWorkingLocation.StartTime    = fromTime;
            addNewWorkingLocation.EndTime      = toTime;
            addNewWorkingLocation.IsActive     = false;

            await unitOfWork.ServiceLocationRepository.AddAsync(addNewWorkingLocation);
            bool saveResult = await unitOfWork.SaveAsync();
       
            return new ResponseDto
            {
                StatusCode  = saveResult ? 200 : 500,
                Success     = saveResult,
                Data        = addNewWorkingLocation,
                Message     = saveResult ? StringConstant.AddedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> GetAllWorkingLocationsAsync(long deliveryAgentId)
        {
            var allLocations = await unitOfWork.ServiceLocationRepository.GetAll().Where(u => u.AgentId == deliveryAgentId).ToListAsync();
            if(allLocations.IsNullOrEmpty())
            {
                return null;
            }

            return new ResponseDto
            {
                StatusCode  = 200,
                Success     = true,
                Data        = allLocations,
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
                StatusCode = saveResult ? 200 : 500,
                Success    = saveResult,
                Data       = serviceLocation,
                Message    = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto)
        {
            var agentLocations = await unitOfWork.ServiceLocationRepository.GetAll()
            .Where(u => u.AgentId == activeAddressDto.AgentId).ToListAsync();

            if (agentLocations.IsNullOrEmpty())
            {
                return null;
            }
            var responseObject = new object();
            foreach(var location in agentLocations)
            {
                if(location.ServiceLocationId == activeAddressDto.ServiceLocationId)
                {
                    responseObject = location;
                    location.IsActive = activeAddressDto.IsActive;
                }
                else
                {
                    location.IsActive = false;
                }                                            
            }

            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = responseObject,
                Message    = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };        
        }

        public async Task<ResponseDto?> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto)
        {
            var agentLocations = await unitOfWork.ServiceLocationRepository.GetAll()
            .Where(u => u.AgentId == statusDto.DeliveryAgentId).ToListAsync();

            if(agentLocations.IsNullOrEmpty()) { return null; }
            var responseDto = new AvailabilityStatusDto();

            foreach (var agent in agentLocations)
            {       
                 agent.AgentStatus = (ServiceLocation.AvailabilityStatus)statusDto.AgentStatus;                        
            }
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
            var agent = await unitOfWork.ServiceLocationRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId && u.IsActive);
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
            var agent = await unitOfWork.ServiceLocationRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == updateVerificationStatusDto.AgentId
            && u.IsActive);

            if (agent != null)
            {
                agent.verificationStatus = (ServiceLocation.VerificationStatus)updateVerificationStatusDto.verificationStatus;
                await unitOfWork.SaveAsync();
            }
            return new ResponseDto { StatusCode = 200, Success = true, Data = updateVerificationStatusDto, Message = StringConstant.UpdatedMessage };
        }

        public async Task<ResponseDto?> GetVerificationStatusAsync(long agentId)
        {
            var agent = await unitOfWork.ServiceLocationRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId && u.IsActive);
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





