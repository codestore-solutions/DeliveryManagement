using BusinessLogicLayer.IServices;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgentModule.CustomActionFilter;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/working-location")]
    [ApiController]
    public class ServiceLocationController : ControllerBase
    {
        private readonly IServiceLocationService workingLocationService;

        public ServiceLocationController(IServiceLocationService workingLocationService)
        {
            this.workingLocationService = workingLocationService;
        }

        /// <summary>
        /// Get all Working Locations of a delivery agent
        /// </summary>
        /// <param name="agentId" example="4001"></param>
        /// <returns></returns>
        [HttpGet]
        // [Authorize(Roles = "2,5")]
        public async Task<IActionResult> GetAllWorkingLocationsAsync([FromQuery][Required] long agentId)
        {
            var result = await workingLocationService.GetAllWorkingLocationsAsync(agentId);
            if(result.Any())
            {
                return Ok(new ResponseDto { StatusCode = 200, Success = true , Data = result,Message = StringConstant.SuccessMessage });
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

        /// <summary>
        /// Add a new working location Address for delivery agent
        /// </summary>
        /// <param name="workingLocationDto"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> AddNewWorkingLocationAsync([FromBody][Required] ServiceLocationDto workingLocationDto)
        {
            var result = await workingLocationService.AddNewWorkingLocationAsync(workingLocationDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) 
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.AddedMessage });
        }

        /// <summary>
        /// Delete a working location
        /// </summary>
        /// <param name="deliveryAgentId"></param>
        /// <param name="serviceLocationId"></param>
        /// <returns></returns>
        [HttpDelete]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> DeleteWorkingLocationAsync([FromQuery][Required] long serviceLocationId)
        {
            var result = await workingLocationService.DeleteWorkingLocationAsync(serviceLocationId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.DeletedMessage });
        }

        /// <summary>
        /// Update Service Location details
        /// </summary>
        /// <param name="serviceLocationId"></param>
        /// <param name="updateWorkingLocationDto"></param>
        /// <returns></returns>
        [HttpPut]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdateWorkingLocationAsync([Required] long serviceLocationId, [FromBody][Required] UpdateWorkingLocationDto updateWorkingLocationDto)
        {
            var result = await workingLocationService.UpdateWorkingLocationAsync(serviceLocationId, updateWorkingLocationDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage });
        }

        /// <summary>
        /// Set Active Address in working locations.
        /// </summary>
        /// <param name="activeAddressDto"></param>
        /// <returns></returns>
        [HttpPut("updateActiveStatus")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto)
        {
            var result = await workingLocationService.UpdateActiveAddressAsync(activeAddressDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        /// <summary>
        /// Get agent On/Off Duty Status
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("getAvailabilityStatus")]
        // [Authorize(Roles = "2,5")]
        public async Task<IActionResult> GetAgentAvailabilityStatusAsync([Required] long agentId)
        {
            var result = await workingLocationService.GetAgentAvailabilityStatusAsync(agentId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.SuccessMessage });
        }

        /// <summary>
        /// Update Agent On/off Duty Status on Mobile app.
        /// </summary>
        /// <param name="statusDto"></param>
        /// <returns></returns>
        [HttpPut("updateAgentStatus")]
        [ValidateModel]
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdateAgentAvailabilityStatusAsync([FromBody][Required] UpdateAgentAvailabilityStatusDto statusDto)
        {
            var result = await workingLocationService.UpdateAgentAvailabilityStatusAsync(statusDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage });
        }

        [HttpPost("VerifyAgentKycDocuments")]
        [ValidateModel]
        // [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateVerificationStatusAsync(UpdateVerificationStatusDto updateVerificationStatusDto)
        {
            var result = await workingLocationService.UpdateVerificationStatusAsync(updateVerificationStatusDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
                : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage });
        }

        [HttpGet("getVerificationStatus")]
        // [Authorize(Roles = "2,5")]
        public async Task<IActionResult> GetVerificationStatusAsync([FromQuery][Required] long agentId)
        {
            var result = await workingLocationService.GetVerificationStatusAsync(agentId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError })
               : Ok(new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.SuccessMessage });
        }
    }
}
