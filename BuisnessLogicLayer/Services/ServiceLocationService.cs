using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
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

        public async Task<ServiceLocation?> AddNewWorkingLocationAsync(ServiceLocationDto serviceLocationDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == serviceLocationDto.AgentId);
            // If agentId does not exist.
            if (agentDetail == null)
            {
                return null;
            }

            var addServiceLocation = new ServiceLocation();
            mapper.Map(serviceLocationDto, addServiceLocation);

            string concatenatedSelectedDays = string.Join(" ", serviceLocationDto.SelectedDays);
            addServiceLocation.SelectedDays = concatenatedSelectedDays;

            // Core Logic to set first working location as active.
            if (agentDetail.ServiceLocations.IsNullOrEmpty())
            {
                addServiceLocation.IsActive = true;
            }
            else
            {
                addServiceLocation.IsActive = false;
            }

            addServiceLocation.AgentDetailId = agentDetail.Id;
            addServiceLocation.AgentDetails = agentDetail;
            agentDetail.ServiceLocations.Add(addServiceLocation);

            // Adding time slot Ids 
            foreach (var timeSlotId in serviceLocationDto.TimeSlotIds)
            {
                var slot = new AgentTimeSlot
                {
                    IsActive = true,
                    TimeSlotId = timeSlotId,
                    ServiceLocationId = addServiceLocation.Id,
                };
                addServiceLocation.AgentTimeSlots.Add(slot);
            }
            await unitOfWork.ServiceLocationRepository.AddAsync(addServiceLocation);
            await unitOfWork.SaveAsync();

            return addServiceLocation;
        }

        public async Task<IEnumerable<ServiceLocation>?> GetAllWorkingLocationsAsync(long agentId)
        {
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);

            // If agentId does not exist.
            if (agentDetails == null || agentDetails.ServiceLocations.IsNullOrEmpty())
            {
                return null;
            }

            return agentDetails.ServiceLocations;
        }

        public async Task<ServiceLocation?> DeleteWorkingLocationAsync(long serviceLocationId)
        {
            var workingLocation = await unitOfWork.ServiceLocationRepository.DeleteAsync(serviceLocationId);
            if (workingLocation == null)
            {
                return null;
            }
            await unitOfWork.SaveAsync();
            return workingLocation;
            
        } 
        
        public async Task<ServiceLocation?> UpdateWorkingLocationAsync(long serviceLocationId, UpdateWorkingLocationDto updateWorkingLocationDto)
        {
            var serviceLocation = await unitOfWork.ServiceLocationRepository.GetByIdAsync(serviceLocationId);
            if (serviceLocation == null)
            {
                return null;
            }
            mapper.Map(updateWorkingLocationDto, serviceLocation);
            string concatenatedSelectedDays = string.Join(" ", updateWorkingLocationDto.SelectedDays);
            serviceLocation.SelectedDays = concatenatedSelectedDays;

            foreach (var timeSlotId in updateWorkingLocationDto.TimeSlotIds)
            {
                if (serviceLocation.AgentTimeSlots.Any(u => u.TimeSlotId == timeSlotId))
                {
                    continue;
                }
                var slot = new AgentTimeSlot
                {
                    IsActive = true,
                    TimeSlotId = timeSlotId,
                    ServiceLocationId = serviceLocation.Id,
                };
                serviceLocation.AgentTimeSlots.Add(slot);
            }
            await unitOfWork.SaveAsync();

            return serviceLocation;
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
            await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = responseObject,
                Message = StringConstant.UpdatedMessage
            };
        }

        public async Task<AvailabilityStatusDto?> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == statusDto.AgentId);

            if (agent == null) { return null; }
            var response = new AvailabilityStatusDto();

            agent.AgentStatus = (EnumConstants.AvailabilityStatus)statusDto.AgentStatus;
            await unitOfWork.SaveAsync();
            response.AgentStatus = (AvailabilityStatusDto.AvailabilityStatus)statusDto.AgentStatus;

            return response;
        }

        public async Task<AvailabilityStatusDto?> GetAgentAvailabilityStatusAsync(long agentId)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agent == null)
            {
                return null;
            }
            var response = new AvailabilityStatusDto
            {
                AgentStatus = (AvailabilityStatusDto.AvailabilityStatus)agent.AgentStatus
            };

            return response;
        }

        public async Task<UpdateVerificationStatusDto?> UpdateVerificationStatusAsync(UpdateVerificationStatusDto updateVerificationStatusDto)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == updateVerificationStatusDto.AgentId);

            if (agent == null) { return null; }

            agent.verificationStatus = (EnumConstants.VerificationStatus)updateVerificationStatusDto.verificationStatus;
            await unitOfWork.SaveAsync();
            return updateVerificationStatusDto;
        }

        public async Task<VerificationStatusDto?> GetVerificationStatusAsync(long agentId)
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
            return response;
        }

    }
}





