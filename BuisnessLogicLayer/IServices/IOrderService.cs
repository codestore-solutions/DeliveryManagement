using EntityLayer.Models;
using static EntityLayer.Models.Order;

namespace BusinessLogicLayer.IServices
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync(DeliveryType? deliveryType,IsOrderAssigned? isOrderAssigned);
    }
}
