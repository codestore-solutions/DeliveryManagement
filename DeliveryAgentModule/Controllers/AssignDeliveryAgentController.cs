using BusinessLogicLayer.IServices;
using BusinessLogicLayer.Services;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static System.Net.Mime.MediaTypeNames;
using System.Text;
using System.Text.Json;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/agent")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Authorize]
    public class AssignDeliveryAgentController : ControllerBase
    {
        private readonly IAssignDeliveryAgentService deliveryAgentService;
        private readonly HttpClient httpClient;

        public AssignDeliveryAgentController(IAssignDeliveryAgentService deliveryAgentService, HttpClient httpClient)
        {
            this.deliveryAgentService = deliveryAgentService;
            this.httpClient = httpClient;
        }

        // GET: /api/agent/GetAllAgents?pageNumber=1&limit=10
        /// <summary>
        /// Get all assigned agent list with orderId
        /// </summary>
        [HttpGet("get-all")]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable> GetAllAssignedAgent([FromQuery] int pageNumber=1, [FromQuery] int limit=10)
        {
            return await deliveryAgentService.GetAllAsync(pageNumber,limit);
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
        ///        "deliveryAgentId"     : long,
        ///        "orderIds"            : [long,long,long..],
        ///        "buisnessId"          : long,
        ///        "PickupLat"           : double
        ///        "PickupLong"          : double
        ///        "DeliveryAddressLa"   : double
        ///        "DeliveryAddressLong" : double
        ///        "BuisnessId"          : double
        ///     }
        /// </remarks>
        /// <param name="assignManuallyDto"></param>
        /// <returns></returns>
        [HttpPost("assign-manually")]
        [MapToApiVersion("1.0")]
        [ValidateModel]
        public async Task<IActionResult> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            return Ok(await deliveryAgentService.AssignAgentManuallyAsync(assignManuallyDto));
         /*   var requestBody = new
            {
                AgentId = "John Doe",
                Status = "agent_Assigned",
                Order = new
                {
                    OrderId = "1",
                   Timestamp = DateTime.Now.ToString(),
                }      
            };
            var todoItemJson = new StringContent(
                 JsonSerializer.Serialize(requestBody),
                 Encoding.UTF8,
                 Application.Json);
            var microserviceResponse = await httpClient.PutAsync("https://order-processing-dev.azurewebsites.net/api/order/updateOrder", todoItemJson);*/
        }

        // POST: 
        /// <summary>
        /// 
        /// </summary>
        /// <param name="bulkAssignManuallyDto"></param>
        /// <returns></returns>
        [HttpPost("bulk-assign-manually")]
        [MapToApiVersion("1.0")]
        [ValidateModel]
        public async Task<IActionResult> BulkAgentAssignManuallyAsync(BulkAssignManuallyDto bulkAssignManuallyDto)
        {
            return Ok(await deliveryAgentService.BulkAgentAssignManuallyAsync(bulkAssignManuallyDto));
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
        //[ValidateModel]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddAssignDeliveryAgent([FromBody] AssignAgentAutomaticallyDto automaticallyDto)
        {
            return Ok(await deliveryAgentService.AddNearsetDeliveryAgentAsync(automaticallyDto));
        }

        //Post: /api/agent/assign-agent-bulk
        /// <summary>
        /// Assign delivery agents nearest to seller/Business location for multiple order Ids
        /// </summary>
        [HttpPost("assign-agent-bulk")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddAssignDekliveryAgentInBulk(OrderAssingInBulkRequestDto orderAssingInBulkRequestDto)
        {
            return Ok(await deliveryAgentService.AddOrderAssignInBulk(orderAssingInBulkRequestDto));
        }

        // DELETE: /api/delete
        /// <summary>
        /// Remove assigned order to agent by agent Id
        /// </summary>
        [HttpDelete("delete")]
        [MapToApiVersion("1.0")]
        public async Task<ActionResult> RemoveOrderAssigned([FromQuery] int agentId)
        {
            await deliveryAgentService.RemoveOrderAssignedAsync(agentId);
            return Ok(StringConstant.SuccessMessage);
        }

        /// <summary>
        /// Reassign new delivery agent : Update agentId or orderId
        /// </summary>
        [HttpPut("{id}")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> UpdateAgentOrOrderId([FromRoute] int id,[FromBody] UpdateAgentRequestDto updateOrderAssignDto)
        {
            var updatedOrder = await deliveryAgentService.UpdateAsync(id, updateOrderAssignDto);
            if(updatedOrder == null)
            {
                return NotFound(StringConstant.InvalidInputError);
            }
            return Ok(updatedOrder);
        }

       /* [HttpPost]
        public async Task<IActionResult> assignMultipleOrderToOneAgentAsync(AssignMultipleOrderDto dto)
        {
            return Ok(await deliveryAgentService.);
        }*/

    }    
    
}

