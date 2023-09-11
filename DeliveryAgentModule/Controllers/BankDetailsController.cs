using BusinessLogicLayer.IServices;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
using DeliveryAgentModule.CustomActionFilter;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/bank-details")]
    [ApiController]
    public class BankDetailsController : ControllerBase
    {
        private readonly IBankDetailsService bankDetailsService;

        public BankDetailsController(IBankDetailsService bankDetailsService)
        {
            this.bankDetailsService = bankDetailsService;
        }

        /// <summary>
        /// Get Bank details by agent Id.
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("get")]
        // [Authorize(Roles = "2,5")]
        public async Task<ActionResult<ResponseDto>> GetBankDetailAsync([FromQuery][Required] long agentId , bool? masked)
        {
            var result = await bankDetailsService.GetAsync(agentId, masked);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : new ResponseDto { StatusCode = 200, Data = result, Success = true, Message = StringConstant.SuccessMessage };
        }

        /// <summary>
        /// Add bank details for delivery agent.
        /// </summary>
        /// <param name="bankDetailsDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> AddBankDetailsAsync([FromBody][Required] BankDetailsDto bankDetailsDto)
        {
            var result = await bankDetailsService.AddDetailsAsync(bankDetailsDto);
            return result == null ? BadRequest(new { message = StringConstant.ExistingMessage })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.AddedMessage });
        }

        /// <summary>
        /// Update bank details for delivery agent.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="bankDetailsDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id, [FromBody][Required] BankDetailsDto bankDetailsDto)
        {
            var result = await bankDetailsService.UpdateDetailsAsync(id, bankDetailsDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage });
        }

    }
}
