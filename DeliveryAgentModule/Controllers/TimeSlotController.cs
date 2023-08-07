using BusinessLogicLayer.IServices;
using DataAccessLayer.Repository;
using EntityLayer.Common;
using EntityLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class TimeSlotController : ControllerBase
    {
        private readonly ITimeSlotService timeSlotService;

        public TimeSlotController(ITimeSlotService timeSlotService)
        {
            this.timeSlotService = timeSlotService;
        }


        [HttpGet("getAllTimeSlots")]
        public async Task<IActionResult> GetAllTimeSlots([FromQuery] long? businessId)
        {
            var result = await timeSlotService.GetAllTimeSlots(businessId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        [HttpGet("getAllActiveTimeSlots")]
        public async Task<IActionResult> GetAllActiveTimeSlots([FromQuery] long? businessId)
        {
            var result = await timeSlotService.GetAllActiveTimeSlots(businessId);
            return result == null ? NotFound(new {message = StringConstant.ResourceNotFoundError}): Ok(result);
        }

        [HttpPut("updateSlotStatus")]
        public async Task<IActionResult> UpdateSlotStatus([FromQuery]long id, [FromQuery] bool isActive)
        {
            var result = await timeSlotService.UpdateSlotStatus(id, isActive);  
            if(result == null)
            {
                return NotFound(new {message = StringConstant.ResourceNotFoundError});  
            }
            return Ok(result);
        }


        [HttpPut("updateMultipleSlotsStatus")]
        public async Task<IActionResult> UpdateMultipleSlotsStatus([FromQuery]List<long> ids, [FromQuery] bool isActive)
        {
            var result = await timeSlotService.UpdateMultipleSlotsStatus(ids, isActive);
            if (!result.IsNullOrEmpty())
            {
                return Ok(result);
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

    }
}
