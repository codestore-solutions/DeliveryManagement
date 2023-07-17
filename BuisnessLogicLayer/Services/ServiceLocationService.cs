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
using System.Text;
using System.Threading.Tasks;

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

        public async Task<ResponseDto> AddNewWorkingLocationAsync(AddNewWorkingLocationDto workingLocationDto)
        { 

            var addNewWorkingLocation = new ServiceLocation();
            mapper.Map(workingLocationDto, addNewWorkingLocation);

            string concatenatedSelectedDays = string.Join(" ", workingLocationDto.SelectDays);
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

        public async Task<ResponseDto> GetAllWorkingLocationsAsync(long deliveryAgentId)
        {
            var allLocations = await unitOfWork.ServiceLocationRepository.GetAll().Where(u => u.DeliveryAgentId == deliveryAgentId).ToListAsync();

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
            bool saveResult = await unitOfWork.SaveAsync();
           
            return new ResponseDto
            {
                StatusCode   = saveResult ? 200 : 500,
                Success      = saveResult,
                Data         = workingLocation,
                Message      = saveResult ? StringConstant.DeletedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto> UpdateWorkingLocationAsync(long serviceLocationId, UpdateWorkingLocationDto updateWorkingLocationDto)
        {
            var serviceLocation = await unitOfWork.ServiceLocationRepository.GetByIdAsync(serviceLocationId);
            mapper.Map(updateWorkingLocationDto, serviceLocation);

            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success    = saveResult,
                Data       = serviceLocation,
                Message    = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto)
        {
            var agentLocations = await unitOfWork.ServiceLocationRepository.GetAll().Where(u => u.DeliveryAgentId == activeAddressDto.DeliveryAgentId).ToListAsync();

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
                StatusCode = saveResult ? 200 : 500,
                Success    = saveResult,
                Data       = responseObject,
                Message    = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };        
        }

        public async Task<ResponseDto> UpdateAgentAvailabilityStatusAsync(UpdateAgentAvailabilityStatusDto statusDto)
        {
            var agentLocations = await unitOfWork.ServiceLocationRepository.GetAll().Where(u => u.DeliveryAgentId == statusDto.DeliveryAgentId).ToListAsync();

            foreach (var agent in agentLocations)
            {       
                 agent.AgentStatus = (ServiceLocation.AvailabilityStatus)statusDto.AgentStatus;                        
            }
            bool saveResult = await unitOfWork.SaveAsync();
            return new ResponseDto
            {
                StatusCode  = saveResult ? 200 : 500,
                Success     = saveResult,
                Data        = agentLocations,
                Message     = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage,
            };
        }

        public async Task<ResponseDto> GetAgentAvailabilityStatusAsync(long agentId)
        {
            var agent = await unitOfWork.ServiceLocationRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == agentId && u.IsActive);

            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = agent,
                Message    = StringConstant.SuccessMessage,
            };
        }
    }

}





