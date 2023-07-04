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
    public class WorkingLocationService : IWorkingLocationService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public WorkingLocationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto> AddNewWorkingLocationAsync(AddNewWorkingLocationDto workingLocationDto)
        {
            var existingWorkingLocation = await unitOfWork.WorkingLocationRepository.GetAll().Include(c => c.ServiceLocations)
            .FirstOrDefaultAsync(u => u.DeliveryAgentId == workingLocationDto.DeliveryAgentId);

            bool saveResult = false;
            if (existingWorkingLocation == null)
            {
                existingWorkingLocation = new WorkingLocation();
                existingWorkingLocation.DeliveryAgentId = workingLocationDto.DeliveryAgentId;
                
                var newServiceLocation = new ServiceLocation();
                mapper.Map(workingLocationDto, newServiceLocation);
                newServiceLocation.WorkingLocationId = existingWorkingLocation.WorkingLocationId;
                existingWorkingLocation.ServiceLocations.Add(newServiceLocation);
                await unitOfWork.WorkingLocationRepository.AddAsync(existingWorkingLocation);
                saveResult = await unitOfWork.SaveAsync();
            }
            else
            {
                var newServiceLocation = new ServiceLocation();
                mapper.Map(workingLocationDto, newServiceLocation);
                newServiceLocation.WorkingLocationId = existingWorkingLocation.WorkingLocationId;
                existingWorkingLocation.ServiceLocations.Add(newServiceLocation);
                await unitOfWork.WorkingLocationRepository.AddAsync(existingWorkingLocation);
                saveResult = await unitOfWork.SaveAsync();
            }

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success = saveResult,
                Data = existingWorkingLocation,
                Message = saveResult ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
            };

        }

        public async Task<ResponseDto> GetAllWorkingLocationsAsync(long deliveryAgentId)
        {
            var allLocations = await unitOfWork.WorkingLocationRepository.GetAll().Include(c => c.ServiceLocations)
            .FirstOrDefaultAsync(u => u.DeliveryAgentId == deliveryAgentId);

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = allLocations,
                Message = StringConstant.SuccessMessage
            };

        }

        public async Task<ResponseDto?> DeleteWorkingLocationAsync(long deliveryAgentId, long serviceLocationId)
        {
            var allLocations = await unitOfWork.WorkingLocationRepository.GetAll()
         .Include(c => c.ServiceLocations)
         .FirstOrDefaultAsync(u => u.DeliveryAgentId == deliveryAgentId);

            bool saveResult = false;
            if (allLocations == null)
            {
                return null;
            }

            var serviceLocation = allLocations.ServiceLocations.FirstOrDefault(p => p.ServiceLocationId == serviceLocationId);
            if (serviceLocation != null)
            {
                allLocations.ServiceLocations.Remove(serviceLocation);
                saveResult = await unitOfWork.SaveAsync();
            }

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success = saveResult,
                Data = allLocations,
                Message = saveResult ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
            };

        }

        //public async Task<ResponseDto> UpdateWorkingLocationAsync(long serviceLocationId, )
    }

}
