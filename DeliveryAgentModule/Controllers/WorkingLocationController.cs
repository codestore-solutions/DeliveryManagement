using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/working-location")]
    [ApiController]
    public class WorkingLocationController : ControllerBase
    {
        private readonly IWorkingLocationService workingLocationService;

        public WorkingLocationController(IWorkingLocationService workingLocationService)
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
            return Ok(await workingLocationService.GetAllWorkingLocationsAsync(deliveryAgentId));   
        }

        /// <summary>
        /// Add a new working location Address for delivery agent
        /// </summary>
        /// <param name="workingLocationDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddNewWorkingLocationAsync(AddNewWorkingLocationDto workingLocationDto)
        {
            return Ok(await workingLocationService.AddNewWorkingLocationAsync(workingLocationDto));
        }

        /// <summary>
        /// Delete a working location
        /// </summary>
        /// <param name="deliveryAgentId"></param>
        /// <param name="serviceLocationId"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteWorkingLocationAsync([FromQuery] long serviceLocationId)
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
        public async Task<IActionResult> UpdateWorkingLocationAsync(long serviceLocationId, UpdateWorkingLocationDto updateWorkingLocationDto)
        {
            return Ok(await workingLocationService.UpdateWorkingLocationAsync(serviceLocationId, updateWorkingLocationDto));    
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
            return Ok(await workingLocationService.UpdateActiveAddressAsync(activeAddressDto));
        }
    }
}
