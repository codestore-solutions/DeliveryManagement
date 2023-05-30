using BusinessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Mvc;
using OrderingBookingModule.CustomActionFilter;
using System.Collections;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/agent")]
    [ApiController]
    public class AssignDeliveryAgentController : ControllerBase
    {
        private readonly IAssignDeliveryAgentService orderAssignService;
        public AssignDeliveryAgentController(IAssignDeliveryAgentService orderAssignService)
        {
            this.orderAssignService = orderAssignService;
        }

        // GET: /api/agent/GetAllAgents?pageNumber=1&limit=10
        /// <summary>
        /// Get all assigned agent list with orderId
        /// </summary>
        [HttpGet("get-all")]
        public async Task<IEnumerable> GetAllAssignedAgent([FromQuery] int pageNumber=1, [FromQuery] int limit=1000)
        {
            return await orderAssignService.GetAllAsync(pageNumber,limit);
        }

        // Post: /api/agent/assign-agent
        /// <summary>
        /// Assign Delivery Agent for a individual order Id
        /// </summary>
        /// <remarks>
        /// Sample Request:
        /// {
        /// 
        /// }
        /// </remarks>
        [HttpPost("assign-agent")]
        [ValidateModel]
        public async Task<IActionResult> AddAssignDeliveryAgent([FromBody] AgentAssignRequestDto agentAssignRequestDto)
        {
            return Ok(await orderAssignService.AddNearsetDeliveryAgentAsync(agentAssignRequestDto));
        }

        //Post: /api/agent/assign-agent-bulk
        /// <summary>
        /// Assign Delivery Agent for multiple order Ids
        /// </summary>
        [HttpPost("assign-agent-bulk")]
        public async Task<IActionResult> AddAssignDekliveryAgentInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {
            return Ok(await orderAssignService.AddOrderAssignInBulk(orderAssingInBulkRequestDto));
        }

        /// <summary>
        /// Remove Delivery Agent by agent Id
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveOrderAssigned([FromRoute] int id)
        {
            return Ok(await orderAssignService.RemoveOrderAssignedAsync(id));
        }

        /// <summary>
        /// Update Delivery Agent or Order Id provide agent Id as parameter
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAgentOrOrderId([FromRoute] int id,[FromBody] UpdateOrderAssignDto updateOrderAssignDto)
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

