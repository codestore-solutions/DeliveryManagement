using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<VehicleDetailResponseDto?> GetAsync(long agentId)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agentDetail == null || agentDetail.VehicleDetails == null) { return null; }

            var vehicleDetail = agentDetail.VehicleDetails;
            var response = new VehicleDetailResponseDto();
            mapper.Map(vehicleDetail, response);
            return response;
        }

        public async Task<ResponseDto?> AddDetailsAsync(VehicleDetailsDto vehicleDetailsDto)
        {
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == vehicleDetailsDto.AgentId);

            // Details already exists in db.
            if (agentDetails == null || agentDetails.VehicleDetails != null)
            {
                return null;
            }

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
                Data = addVehicleDetails,
                Message = saveResult ? StringConstant.AddedMessage : StringConstant.DatabaseMessage
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
                StatusCode = 200,
                Success = true,
                Data = vehicleDetails,
                Message = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

    }
}
