using BusinessLogicLayer.IServices;
using BusinessLogicLayer.Services;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

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
        /// <param name="deliveryAgentId" example="4001"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllWorkingLocationsAsync([FromQuery][Required] long deliveryAgentId)
        {
            var result = await workingLocationService.GetAllWorkingLocationsAsync(deliveryAgentId);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

        /// <summary>
        /// Add a new working location Address for delivery agent
        /// </summary>
        /// <param name="workingLocationDto"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> AddNewWorkingLocationAsync([FromBody][Required] AddNewWorkingLocationDto workingLocationDto)
        {
            var result = await workingLocationService.AddNewWorkingLocationAsync(workingLocationDto);
            if(result == null)
            {
                return BadRequest(StringConstant.ExistingMessage);
            }
            return Ok(result);
        }

        /// <summary>
        /// Delete a working location
        /// </summary>
        /// <param name="deliveryAgentId"></param>
        /// <param name="serviceLocationId"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteWorkingLocationAsync([FromQuery][Required] long serviceLocationId)
        {
            var serviceLocation = await workingLocationService.DeleteWorkingLocationAsync(serviceLocationId);
            if(serviceLocation == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(serviceLocation);
        }

        /// <summary>
        /// Update Service Location details
        /// </summary>
        /// <param name="serviceLocationId"></param>
        /// <param name="updateWorkingLocationDto"></param>
        /// <returns></returns>
        [HttpPut]
        [ValidateModel]
        public async Task<IActionResult> UpdateWorkingLocationAsync([Required] long serviceLocationId, [FromBody][Required] UpdateWorkingLocationDto updateWorkingLocationDto)
        {
            var result = await workingLocationService.UpdateWorkingLocationAsync(serviceLocationId, updateWorkingLocationDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

        /// <summary>
        /// Set Active Address in working locations.
        /// </summary>
        /// <param name="activeAddressDto"></param>
        /// <returns></returns>
        [HttpPut("updateActiveStatus")]
        [ValidateModel]
        public async Task<IActionResult> UpdateActiveAddressAsync(UpdateActiveAddressDto activeAddressDto)
        {
            var result = await workingLocationService.UpdateActiveAddressAsync(activeAddressDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

        /// <summary>
        /// Get agent On/Off Duty Status
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("getAvailabilityStatus")]
        public async Task<IActionResult> GetAgentAvailabilityStatusAsync([Required] long agentId)
        {
            var result = await workingLocationService.GetAgentAvailabilityStatusAsync(agentId);
            if(result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

        /// <summary>
        /// Update Agent On/off Duty Status on Mobile app.
        /// </summary>
        /// <param name="statusDto"></param>
        /// <returns></returns>
        [HttpPut("updateAgentStatus")]
        [ValidateModel]
        public async Task<IActionResult> UpdateAgentAvailabilityStatusAsync([FromBody][Required] UpdateAgentAvailabilityStatusDto statusDto)
        {
            var result = await workingLocationService.UpdateAgentAvailabilityStatusAsync(statusDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

    }
}
