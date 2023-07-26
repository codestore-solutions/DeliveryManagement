using BusinessLogicLayer.Services;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IAssignDeliveryAgentService
    {     
       public Task<ResponseDto> GetAllAsync(int pageNumber=1, int limit=10);
       public Task<ResponseDto> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto);
       public Task<ResponseDto> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto);
       public Task<ResponseDto?> AcceptOrderAsync(AcceptRejectOrderDto acceptRejectOrderDto);
      
    }
}
