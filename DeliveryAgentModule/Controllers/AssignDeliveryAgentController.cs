using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DeliveryAgentModule.CustomActionFilter;
using System.Collections;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/agent")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Authorize]
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

        // POST: /api/v1/agent/assign-manually
        /// <summary>
        /// Assign agent manually
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      POST: /api/v1/agent/assign-manually
        ///     {
        ///        "deliveryAgentId"    : long,
        ///        "orderId"            : long,
        ///        "buisnessId"         : long,
        ///     }
        /// </remarks>
        /// <param name="assignManuallyDto"></param>
        /// <returns></returns>
        [HttpPost("assign-manually")]
        [MapToApiVersion("1.0")]
        [ValidateModel]
        public async Task<IActionResult> assignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            return Ok(await orderAssignService.assignAgentManuallyAsync(assignManuallyDto));
        }      

        // Post: /api/agent/assign-agent
        /// <summary>
        /// Assign delivery agent nearest to Business/Seller location for a individual order Id
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
        /// Assign delivery agents nearest to seller/Business location for multiple order Ids
        /// </summary>
        [HttpPost("assign-agent-bulk")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddAssignDekliveryAgentInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {
            return Ok(await orderAssignService.AddOrderAssignInBulk(orderAssingInBulkRequestDto));
        }

        // DELETE: /api/delete
        /// <summary>
        /// Remove assigned order to agent by agent Id
        /// </summary>
        [HttpDelete("delete")]
        [MapToApiVersion("1.0")]
        public async Task<ActionResult> RemoveOrderAssigned([FromQuery] int agentId)
        {
            await orderAssignService.RemoveOrderAssignedAsync(agentId);
            return Ok(StringConstant.SuccessMessage);
        }

        /// <summary>
        /// Reassign new delivery agent : Update agentId or orderId
        /// </summary>
        [HttpPut("{id}")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateAgentOrOrderId([FromRoute] int id,[FromBody] UpdateAgentRequestDto updateOrderAssignDto)
        {
            var updatedOrder = await orderAssignService.UpdateAsync(id, updateOrderAssignDto);

            if(updatedOrder == null)
            {
                return NotFound(StringConstant.InvalidInputError);
            }
            return Ok(updatedOrder);
        }

    }    
    
}

