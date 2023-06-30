using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using static EntityLayer.Models.BusinessAdmin;

namespace BusinessLogicLayer.Services
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
        public async Task<ResponseDto> GetAllDeliveryAgentAsync(long businessId, string? filterOn , string? filterQuery  , OrderAssignedStatus? orderAssignedStatus, DeliveryAgentStatus? status,
           int pageNumber = 1, int limit = 10)
        {
             var allItems = unitOfWork.BusinessAdminRepository.GetAll().Where(x => x.BusinessId == businessId);
        
             int agentCount = unitOfWork.BusinessAdminRepository.GetAll().Count();

            if (string.IsNullOrWhiteSpace(filterOn)== false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if(filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                   allItems= allItems.Where(x => x.DeliveryAgentName.Contains(filterQuery));               
                } 
                else if (filterOn.Equals("Email", StringComparison.OrdinalIgnoreCase))
                {
                  allItems =  allItems.Where(x => x.AgentEmailId.Contains(filterQuery));
                }
            }
            
           var allitems = await allItems.Where(x=>
                    (status == null || x.AgentStatus == status)
                    && (orderAssignedStatus == null || x.OrderAssignStatus == orderAssignedStatus))
                   .Skip((pageNumber - 1) * limit).Take(limit).ToListAsync();


            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = allitems,
                Message = StringConstant.SuccessMessage
            };
             
        }
      
        public async Task DeleteDeliveryAgentAsync(long agentId)
        {
            var agent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(id => id.DeliveryAgentId == agentId);
            await unitOfWork.BusinessAdminRepository.DeleteAsync(agent.Id);
            await unitOfWork.SaveAsync();
        }

        // For Delivery agent mobile app
        public async Task<VerifyAgentRequestDto> VerifyNewDeliveryAgentRequest(VerifyAgentRequestDto verifyAgentRequest)
        {
            var domainModel = mapper.Map<BusinessAdmin>(verifyAgentRequest);
            await unitOfWork.BusinessAdminRepository.AddAsync(domainModel);
            await unitOfWork.SaveAsync();
            var responseDto = mapper.Map<VerifyAgentRequestDto>(domainModel);
            return responseDto;
        }

        public async Task<ResponseDto> GetMultipleAgentsAsync(List<long> DeliveryAgentIds)
        {
            var agentList = new List<Object>();

            foreach (var agentId in DeliveryAgentIds)
            {
                var agent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == agentId);
                if (agent == null)
                {
                    return new ResponseDto
                    {
                        StatusCode = 400,
                        Success = false,
                        Data = StringConstant.InvalidInputError,
                        Message = StringConstant.ErrorMessage
                    };
                }
                agentList.Add(agent);
            }

            return new ResponseDto
            {
                Success = true,
                StatusCode = 200,
                Data = agentList,
                Message = StringConstant.SuccessMessage
            };
        }


        /*  public async Task<ResponseDto> UpdateVerificationSatus(long agentId, VerificationStatus status)
        {
            var response = new ResponseDto();
            var agent = await unitOfWork.BusinessAdminRepository.GetAll().FirstOrDefaultAsync(id => id.DeliveryAgentId == agentId);
            if (agent == null)
            {
                response.StatusCode = 404;
                response.Success = false;
                response.Message = "agentId can't be found";
                return response;
            }
            agent.VerStatus = status;
            await unitOfWork.SaveAsync();

            response.StatusCode = 200;
            response.Success = true;
            response.Data = agent;
            response.Message = "Status Updated Successfully";
            return response;
        }*/
    }
}
