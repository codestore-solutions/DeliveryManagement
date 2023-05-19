using BusinessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/orderAssign")]
    [ApiController]
    public class OrderAssignController : ControllerBase
    {
        private readonly IOrderAssignService orderAssignService;
        public OrderAssignController(IOrderAssignService orderAssignService)
        {
            this.orderAssignService = orderAssignService;
        }

        // GET: /api/orderAssign/GetAllAgents?pageNumber=1&limit=10
        [HttpGet("GetAllAgents")]
        public async Task<IEnumerable> GetAllAssignedAgent([FromQuery] int pageNumber=1, [FromQuery] int limit=1000)
        {
            return await orderAssignService.GetAllAsync(pageNumber,limit);
        }

        // Post: /api/orderAssign
        [HttpPost]
        public async Task<IActionResult> AddOrderAssign([FromBody] OrderAssignRequestDto orderAssignRequestDto)
        {
            return Ok(await orderAssignService.AddNearsetDeliveryAgentAsync(orderAssignRequestDto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveOrderAssigned(int id)
        {
            return Ok(await orderAssignService.RemoveOrderAssignedAsync(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAgentOrOrderId(int id,[FromBody] UpdateOrderAssignDto updateOrderAssignDto)
        {
            var updatedOrder = await orderAssignService.UpdateAsync(id, updateOrderAssignDto);

            if(updatedOrder == null)
            {
                return NotFound();
            }
            return Ok(updatedOrder);
        }

    }    
    
}

