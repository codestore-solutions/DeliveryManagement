using BusinessLogicLayer.IServices;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgentModule.CustomActionFilter;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/kyc")]
    [ApiController]
    public class KYCController : ControllerBase
    {
        private readonly IKYCService kYCService;

        public KYCController(IKYCService kYCService)
        {
            this.kYCService = kYCService;
        }

        /// <summary>
        /// Get KYC details by agent Id.
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("get")]
        // [Authorize(Roles = "2,5")]
        public async Task<IActionResult> GetAgentDetailAsync([FromQuery][Required] long agentId)
        {
            var result = await kYCService.GetAsync(agentId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        /// <summary>
        /// Add KYC details for delivery agent.
        /// </summary>
        /// <param name="kYCDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> AddKYCDetailsAsync([FromBody] KYCListDto kYCDto)
        {
            var result = await kYCService.AddDetailsAsync(kYCDto);
            return result == null ? NotFound(new { message = StringConstant.ExistingMessage }) : Ok(result);
        }

        /// <summary>
        /// Update KYC details for delivery agent.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="kYCDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        // [Authorize(Roles = "5")]
        [ValidateModel]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id, [FromBody] KYCDto kYCDto)
        {
            var result = await kYCService.UpdateDetailsAsync(id, kYCDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

    }
}
