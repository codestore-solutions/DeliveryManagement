using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
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
            response.RegistrationNumber = MaskData.SensitiveInfo(vehicleDetail.RegistrationNumber);
            return response;
        }

        public async Task<VehicleDetail?> AddDetailsAsync(VehicleDetailsDto vehicleDetailsDto)
        {
            var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == vehicleDetailsDto.AgentId);

            // Details already exists in db.
            if (agentDetails == null || agentDetails.VehicleDetails != null)
            {
                return null;
            }

            var addVehicleDetails = new VehicleDetail();
            addVehicleDetails.AgentDetailId = agentDetails.Id;
            addVehicleDetails.CreatedOn = DateTime.Now;
            addVehicleDetails.UpdatedOn = DateTime.Now;
            mapper.Map(vehicleDetailsDto, addVehicleDetails);

            await unitOfWork.VehicleDetailsRepository.AddAsync(addVehicleDetails);
            await unitOfWork.SaveAsync();

            return addVehicleDetails;
        }

        public async Task<VehicleDetail?> UpdateDetailsAsync(long id, VehicleDetailsDto vehicleDetailsDto)
        {
            var vehicleDetails = await unitOfWork.VehicleDetailsRepository.GetByIdAsync(id);

            if (vehicleDetails != null)
            {
                mapper.Map(vehicleDetailsDto, vehicleDetails);
                vehicleDetails.UpdatedOn = DateTime.Now;
                await unitOfWork.SaveAsync();
            }

            return vehicleDetails;
        }
    }
}
