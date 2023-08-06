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
using System.Net;
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
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == vehicleDetailsDto.AgentId);

            if (agentDetails == null) return BuildErrorResponse((int)HttpStatusCode.NotFound, "AgentId doesn't exist", false);

            var vehicleDetails = agentDetails.VehicleDetails;
            if(vehicleDetails == null)
            {
                var addVehicleDetails = new VehicleDetail();
                mapper.Map(vehicleDetailsDto, addVehicleDetails);
                addVehicleDetails.AgentDetailId = agentDetails.Id;
                addVehicleDetails.AgentDetails = agentDetails;
                addVehicleDetails.CreatedOn = DateTime.Now;
                addVehicleDetails.UpdatedOn = DateTime.Now;

                await unitOfWork.VehicleDetailsRepository.AddAsync(addVehicleDetails);
                bool saveResult = await unitOfWork.SaveAsync();

                return new ResponseDto
                {
                    StatusCode = 200,
                    Success = true,
                    Data    = addVehicleDetails,
                    Message = saveResult ? StringConstant.AddedMessage : StringConstant.DatabaseMessage
                };
            }
            return null;
        }

        public async Task<ResponseDto?> GetAsync(long agentId)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agentDetail == null) { return BuildErrorResponse((int)HttpStatusCode.NotFound, StringConstant.IdNotExistError, false); }

            var vehicleDetail = agentDetail.VehicleDetails; 
            if (vehicleDetail == null)
            {
                return BuildErrorResponse((int)HttpStatusCode.NotFound, StringConstant.ResourceNotFoundError , false); 
            }

            var vehicleDetailDto = new VehicleDetailsDto();
            mapper.Map(vehicleDetail, vehicleDetailDto);

            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = vehicleDetailDto,
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
            vehicleDetails.UpdatedOn = DateTime.Now;
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode      = 200,
                Success         = true,
                Data            = vehicleDetails,
                Message         = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

        public static ResponseDto BuildErrorResponse(int statusCode, string message, bool success)
        {
            var response = new ResponseDto
            {
                StatusCode = statusCode,
                Message    = message,
                Success    = success
            };
            return response;
        }

    }
}
