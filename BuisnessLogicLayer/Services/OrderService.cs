using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Models;
using static EntityLayer.Models.Order;

namespace BusinessLogicLayer.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork unitOfWork;
        public OrderService(IUnitOfWork unitOfWork) 
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync(DeliveryType? deliveryType, IsOrderAssigned? isOrderAssigned)
        {
            var allItems = await unitOfWork.OrderRepository.AsQueryableAsync();
            allItems = allItems.Where(item => deliveryType == null || item.deliveryType == deliveryType);
            allItems= allItems.Where(item=> isOrderAssigned==null || item.isOrderAssigned==isOrderAssigned);
            return allItems;
        }
    }
}
