using BusinessLogicLayer.IServices;
using Microsoft.AspNetCore.Mvc;
using static EntityLayer.Models.Order;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/order")]
    [ApiController]
    //[Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [HttpGet("availableOrderList")]
        public async Task<IActionResult> GetAllOrders([FromQuery] DeliveryType? deliveryType, [FromQuery] IsOrderAssigned? isOrderAssigned)
        {
            return Ok(await orderService.GetAllOrdersAsync(deliveryType, isOrderAssigned));
        }

    }

}
