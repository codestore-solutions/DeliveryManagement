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

        public async Task<VerifyAgentRequestDto> VerifyNewDeliveryAgentRequest(VerifyAgentRequestDto verifyAgentRequest)
        {
            var domainModel= mapper.Map<BusinessAdmin>(verifyAgentRequest);
            await unitOfWork.BusinessAdminRepository.AddAsync(domainModel);
            await unitOfWork.SaveAsync();
            var responseDto=mapper.Map<VerifyAgentRequestDto>(domainModel);
            return responseDto;
        }

        public async Task<BusinessAdmin> DeleteDeliveryAgentAsync(int id)
        {
            return await unitOfWork.BusinessAdminRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable> GetDeliveryAgentAsync(long id, OrderAssignedStatus orderAssignedStatus,DeliveryAgentStatus status, VerificationStatus verStatus, int pageNumber = 1, int limit = 1000)
        {
            var allItems = await unitOfWork.BusinessAdminRepository.AsQueryableAsync();
            allItems     = allItems.Where(x => x.BusinessId == id);   
            allItems     = allItems.Where(item => item.AgentStatus == status);
            allItems     = allItems.Where(item => item.VerStatus == verStatus);
            allItems     = allItems.Where(item => item.OrderAssignStatus == orderAssignedStatus);

            return await allItems.Skip((pageNumber - 1) * limit).Take(limit).ToListAsync(); 
        }
        
        public Task<UpdateBusinessAdminDto> UpdateDeliveryAgentAsync(int id, UpdateBusinessAdminDto updateBuisnessAdminDto)
        {
            throw new NotImplementedException();
        }

        public async Task<BusinessAdmin> UpdateVerificationSatus(long id, VerificationStatus status)
        {
           var agent= unitOfWork.BusinessAdminRepository.FindInList(ids=>ids.DeliveryAgentId==id);
            if (agent != null)
            {
                agent.VerStatus = status;
            }        
           await unitOfWork.SaveAsync();
           return agent;
        }
    }
}
