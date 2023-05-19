using EntityLayer.Dtos;
using EntityLayer.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IOrderAssignService
    {
       Task<IEnumerable<OrderAssign>> GetAllAsync(int pageNumber=1, int limit=1000);
       Task<OrderAssignRequestDto> CreateOrderAsync(OrderAssignRequestDto orderAssignRequestDto);
       Task<OrderAssign> RemoveOrderAssignedAsync(int id);
       Task<OrderAssign> UpdateAsync(int id, UpdateOrderAssignDto orderAssignDto);
       Task<OrderAssign> AddNearsetDeliveryAgentAsync(OrderAssignRequestDto orderAssignRequestDto);

    }
}
