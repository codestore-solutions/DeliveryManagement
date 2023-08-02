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
    public class VehicleDetailsService : IVehicleDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public VehicleDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto?> AddDetailsAsync(VehicleDetailsDto vehicleDetailsDto)
        {   
            var exitingDetails = await unitOfWork.VehicleDetailsRepository.GetAll()
            .FirstOrDefaultAsync(u => u.AgentId == vehicleDetailsDto.AgentId);

            if (exitingDetails != null)
            {
                return null;
            }
            var addNewvehicleDetails = new VehicleDetails();
            mapper.Map(vehicleDetailsDto, addNewvehicleDetails);
            await unitOfWork.VehicleDetailsRepository.AddAsync(addNewvehicleDetails);
            bool saveResult = await unitOfWork.SaveAsync();
           
            return new ResponseDto
            {
                StatusCode   = saveResult ? 200 : 500,
                Success      = saveResult,
                Data         = addNewvehicleDetails,
                Message      = saveResult ? StringConstant.AddedMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> GetAsync(long agentId)
        {
            var vehicleDetails = await unitOfWork.VehicleDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (vehicleDetails == null)
            {
                return null;
            }
            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = vehicleDetails,
                Message    = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto?> UpdateDetailsAsync(long id, VehicleDetailsDto vehicleDetailsDto)
        {
            var vehicleDetails = await unitOfWork.VehicleDetailsRepository.GetByIdAsync(id);
            if (vehicleDetails == null)
            {
                return null;
            }
            mapper.Map(vehicleDetailsDto, vehicleDetails);
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode      = saveResult ? 200 : 500,
                Success         = saveResult,
                Data            = vehicleDetails ,
                Message         = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

    }
}
