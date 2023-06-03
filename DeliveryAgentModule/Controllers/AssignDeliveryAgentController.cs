using BusinessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Mvc;
using OrderingBookingModule.CustomActionFilter;
using System.Collections;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/agent")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
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
        [MapToApiVersion("1.0")]
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
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddAssignDeliveryAgent([FromBody] AgentAssignRequestDto agentAssignRequestDto)
        {
            return Ok(await orderAssignService.AddNearsetDeliveryAgentAsync(agentAssignRequestDto));
        }

        //Post: /api/agent/assign-agent-bulk
        /// <summary>
        /// Assign Delivery Agent for multiple order Ids
        /// </summary>
        [HttpPost("assign-agent-bulk")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddAssignDekliveryAgentInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {
            return Ok(await orderAssignService.AddOrderAssignInBulk(orderAssingInBulkRequestDto));
        }

        /// <summary>
        /// Remove assigned order to agent by agent Id
        /// </summary>
        [HttpDelete("{id}")]
        [MapToApiVersion("1.0")]
        public async Task<ActionResult> RemoveOrderAssigned([FromRoute] int id)
        {
            return Ok(await orderAssignService.RemoveOrderAssignedAsync(id));
        }

        /// <summary>
        /// Reassign new delivery agent Update agentId or orderId
        /// </summary>
        [HttpPut("{id}")]
        [MapToApiVersion("1.0")]
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

