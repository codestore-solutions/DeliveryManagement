using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

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
        public async Task<IActionResult> GetAllAssignedAgent([FromQuery] int pageNumber=1, [FromQuery] int limit=10)
        {
            return Ok(await deliveryAgentService.GetAllAsync(pageNumber,limit));
        }

        /// <summary>
        /// Assign agent automatically according to the preffered working location by delivery Agent .
        /// </summary>
        /// <param name="assignAgentAutomaticallyDto"></param>
        /// <returns></returns>
        [HttpPost("automatically-assign")]
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
        public async Task<IActionResult> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            return Ok(await deliveryAgentService.AssignAgentManuallyAsync(assignManuallyDto));
         
        }

    }    
    
}

