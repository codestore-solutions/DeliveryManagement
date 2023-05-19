using EntityLayer.Dtos;
using EntityLayer.Models;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace BuisnessLogicLayer.IServices
{
    public interface IBusinessAdminService
    {
        Task<IEnumerable> GetDeliveryAgentAsync(OrderAssignedStatus? orderAssignedStatus,DeliveryAgentStatus? status,int pageNumber = 1, int limit = 1000);
        Task<CreateBusinessAdminDto> AddNewDeliveryAgentAsync(CreateBusinessAdminDto buisnessAdminDto);
        Task<UpdateBusinessAdminDto> UpdateDeliveryAgentAsync(int id, UpdateBusinessAdminDto updateBuisnessAdminDto);
        Task<BusinessAdmin> DeleteDeliveryAgentAsync(int id);
    }
}
