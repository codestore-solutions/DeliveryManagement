using AutoMapper;
using BuisnessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace BuisnessLogicLayer.Services
{
    public class BusinessAdminService : IBusinessAdminService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public BusinessAdminService(IUnitOfWork unitOfWork, IMapper mapper )
        { 
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<CreateBusinessAdminDto> AddNewDeliveryAgentAsync(CreateBusinessAdminDto buisnessAdminDto)
        {
            var domainModel= mapper.Map<BusinessAdmin>(buisnessAdminDto);
            await unitOfWork.BusinessAdminRepository.AddAsync(domainModel);
            await unitOfWork.SaveAsync();
            var buisnessDto=mapper.Map<CreateBusinessAdminDto>(domainModel);
            return buisnessDto;
        }

        public async Task<BusinessAdmin> DeleteDeliveryAgentAsync(int id)
        {
            return await unitOfWork.BusinessAdminRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable> GetDeliveryAgentAsync(OrderAssignedStatus? orderAssignedStatus,DeliveryAgentStatus? status,int pageNumber = 1, int limit = 1000)
        {
            var allItems= unitOfWork.BusinessAdminRepository.AsQueryable();
            allItems = allItems.Where(item => status == null || item.AgentStatus == status || item.OrderAssignStatus == orderAssignedStatus);
            return await allItems.Skip((pageNumber - 1) * limit).Take(limit).ToListAsync(); 
        }
        
        public Task<UpdateBusinessAdminDto> UpdateDeliveryAgentAsync(int id, UpdateBusinessAdminDto updateBuisnessAdminDto)
        {
            throw new NotImplementedException();
        }
    }
}
