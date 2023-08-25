using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;
using System.Text;
using Newtonsoft.Json;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/assignAgent")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    // [Authorize]
    public class AssignDeliveryAgentController : ControllerBase
    {
        private readonly IAssignDeliveryAgentService deliveryAgentService;
        private readonly HttpClient httpClient;

        public AssignDeliveryAgentController(IAssignDeliveryAgentService deliveryAgentService, HttpClient httpClient)
        {
            this.deliveryAgentService = deliveryAgentService;
            this.httpClient = httpClient;
        }

        /// <summary>
        /// Get all assigned agent list with orderId
        /// </summary>
        [HttpGet("get-all")]
        // [Authorize(Roles = "2")]
        public async Task<IActionResult> GetAllAssignedAgent([FromQuery] int pageNumber = 1, [FromQuery] int limit = 10)
        {
            return Ok(await deliveryAgentService.GetAllAsync(pageNumber, limit));
        }


        /// <summary>
        /// Assign agent automatically according to the preffered working location by delivery Agent .
        /// </summary>
        /// <param name="assignAgentAutomaticallyDto"></param>
        /// <returns></returns>
        [HttpPost("automatically-assign-preview")]
        [ValidateModel]
        // [Authorize(Roles = "2")]
        public async Task<IActionResult> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto)
        {
            return Ok(await deliveryAgentService.AssignAgentAutomaticallyAsync(assignAgentAutomaticallyDto));
        }


        /// <summary>
        /// Assign agent manually
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      POST: /api/v1/assignAgent/assign-manually
        ///      
        /// </remarks>
        /// <param name="assignManuallyDto"></param>
        /// <returns></returns>
        [HttpPost("assign-manually")]
        [ValidateModel]
        // [Authorize(Roles = "2")]
        public async Task<IActionResult> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            var response = await deliveryAgentService.AssignAgentManuallyAsync(assignManuallyDto);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(response.StatusCode, response);
        }


        /// <summary>
        /// Accept or Reject Order by agent through Mobile App.
        /// </summary>
        /// <param name="acceptRejectOrderDto"></param>
        /// <returns></returns>
        [HttpPost("acceptOrReject")]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> AcceptOrder([FromBody] AcceptRejectOrderDto acceptRejectOrderDto)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await deliveryAgentService.AcceptOrderAsync(acceptRejectOrderDto, token);
            if (result.Success == false)
            {
                return BadRequest(result);
            }
            return StatusCode(StatusCodes.Status200OK, result);
        }


        [HttpGet("CountDeliveredOrRejectedOrders")]
        // [Authorize(Roles = "2,5")]
        public async Task<IActionResult> GetRejectedOrdersAsync([FromQuery][Required] long agentId)
        {
            var result = await deliveryAgentService.GetDeliveredOrRejectedOrdersCountAsync(agentId);
            return result == null ? NotFound(StringConstant.ResourceNotFoundError) : Ok(result);
        }


        [HttpPut("updatePickupOrDeliveryStatus")]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdatePickupOrDeliveryStatusAsync(UpdatePickupOrDeliveryStatusDto pickupOrDeliveryStatusDto)
        {
            var result = await deliveryAgentService.UpdatePickupOrDeliveryStatusAsync(pickupOrDeliveryStatusDto);
            return result == null ? NotFound(StringConstant.ResourceNotFoundError) : Ok(result);
        }

    }

}

