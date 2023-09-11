using BusinessLogicLayer.IServices;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgentModule.CustomActionFilter;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/vehicle-details")]
    [ApiController]
    public class VehicleDetailsController : ControllerBase
    {
        private readonly IVehicleDetailsService vehicleDetailsService;

        public VehicleDetailsController(IVehicleDetailsService vehicleDetailsService)
        {
            this.vehicleDetailsService = vehicleDetailsService;
        }

        /// <summary>
        /// Get Vehicle details by agent Id.
        /// </summary>
        /// <param name="agentId" example ="4001"></param>
        /// <returns></returns>
        [HttpGet("get")]
        // [Authorize(Roles = "2,5")]
        public async Task<ActionResult<ResponseDto>> GetAgentDetailAsync([FromQuery][Required] long agentId, bool? masked)
        {
            var result = await vehicleDetailsService.GetAsync(agentId, masked);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
               : new ResponseDto { StatusCode = 200, Data = result, Success = true, Message = StringConstant.SuccessMessage };
        }

        /// <summary>
        /// Add vehicle details for delivery agent.
        /// </summary>
        /// <param name="vehicleDetailsDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> AddVehicleDetailsAsync([FromBody][Required] VehicleDetailsDto vehicleDetailsDto)
        {
            var result = await vehicleDetailsService.AddDetailsAsync(vehicleDetailsDto);
            if (result != null)
            {
                return Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.AddedMessage});
            }
            return BadRequest(new { message = StringConstant.ExistingMessage });
        }

        /// <summary>
        /// Update vehicle details for delivery agent.
        /// </summary>
        /// <param name="id" placeholder ="Table Id"></param>
        /// <param name="vehicleDetailsDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id, [FromBody] VehicleDetailsDto vehicleDetailsDto)
        {
            var result = await vehicleDetailsService.UpdateDetailsAsync(id, vehicleDetailsDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage });
        }

    }
}
