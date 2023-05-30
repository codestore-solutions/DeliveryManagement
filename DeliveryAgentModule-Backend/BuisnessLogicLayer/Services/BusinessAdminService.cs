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

        public BusinessAdminService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<VerifyAgentRequestDto> VerifyNewDeliveryAgentRequest(VerifyAgentRequestDto verifyAgentRequest)
        {
            var domainModel = mapper.Map<BusinessAdmin>(verifyAgentRequest);
            await unitOfWork.BusinessAdminRepository.AddAsync(domainModel);
            await unitOfWork.SaveAsync();
            var responseDto = mapper.Map<VerifyAgentRequestDto>(domainModel);
            return responseDto;
        }

        public async Task<BusinessAdmin> DeleteDeliveryAgentAsync(int id)
        {
            return await unitOfWork.BusinessAdminRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable> GetDeliveryAgentAsync(long id, OrderAssignedStatus? orderAssignedStatus, DeliveryAgentStatus? status,
            VerificationStatus? verificationStatus, int pageNumber = 1, int limit = 100)
        {
            var allItems = await unitOfWork.BusinessAdminRepository.AsQueryableAsync();
          /*  allItems = allItems.Where(x => x.BusinessId == id);
            allItems = allItems.Where(item => status == null || item.AgentStatus == status);
            allItems = allItems.Where(item => verificationStatus == null || item.VerStatus == verificationStatus);
            allItems = allItems.Where(item => orderAssignedStatus == null || item.OrderAssignStatus == orderAssignedStatus) ;
            return await allItems.Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();*/

            return await allItems
            .Where(x => x.BusinessId == id && (status == null ||  x.AgentStatus == status)
            && (verificationStatus == null || x.VerStatus == verificationStatus) 
            && (orderAssignedStatus == null || x.OrderAssignStatus == orderAssignedStatus))
            .Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();
        }

        public async Task<ResponseDto> UpdateVerificationSatus(long agentId, VerificationStatus status)
        {
            var response = new ResponseDto();

            var agent = unitOfWork.BusinessAdminRepository.FindInList(id => id.DeliveryAgentId == agentId);
            if (agent == null)
            {
                response.StatusCode = 404;
                response.Success    = false;
                response.Message    = "agentId can't be found";
                return response;
            }
            agent.VerStatus = status;
            await unitOfWork.SaveAsync();
            response.StatusCode = 200;
            response.Success     = true;
            response.Data        = agent;
            response.Message     = "Status Updated Successfully";
            return response;          
        }

    }
}
