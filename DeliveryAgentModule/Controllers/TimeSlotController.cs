using BusinessLogicLayer.IServices;
using EntityLayer.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    //[Authorize]
    public class TimeSlotController : ControllerBase
    {
        private readonly ITimeSlotService timeSlotService;

        public TimeSlotController(ITimeSlotService timeSlotService)
        {
            this.timeSlotService = timeSlotService;
        }

        /// <summary>
        /// Get list of all time slots.
        /// </summary>
        /// <param name="businessId"></param>
        /// <returns></returns>
        [HttpGet("getAllTimeSlots")]
        // [Authorize(Roles = "2")]
        public async Task<ActionResult<ResponseDto>> GetAllTimeSlots([FromQuery] long? businessId)
        {
            var result = await timeSlotService.GetAllTimeSlots(businessId);
            if (!result.IsNullOrEmpty())
            {
                return new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.SuccessMessage };
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

        /// <summary>
        /// Get list of all active time slots.
        /// </summary>
        /// <param name="businessId"></param>
        /// <returns></returns>
        [HttpGet("getAllActiveTimeSlots")]
        // [Authorize(Roles = "2,5")]
        public async Task<ActionResult<ResponseDto>> GetAllActiveTimeSlots([FromQuery] long? businessId)
        {
            var result = await timeSlotService.GetAllActiveTimeSlots(businessId);
            if (!result.IsNullOrEmpty())
            {
                return new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.SuccessMessage };
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

        /// <summary>
        /// Update time slot status as active or inactive.
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [HttpPut("updateSlotsStatus")]
        // [Authorize(Roles = "2")]
        public async Task<ActionResult<ResponseDto>> UpdateMultipleSlotsStatus([FromQuery] List<long> ids, [FromQuery] bool isActive)
        {
            var result = await timeSlotService.UpdateMultipleSlotsStatus(ids, isActive);
            if (!result.IsNullOrEmpty())
            {
                return new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage };
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

        /// <summary>
        /// Get time slots by Ids.
        /// </summary>
        /// <param name="slotIds"></param>
        /// <returns></returns>
        [HttpGet("getBySlotIds")]
        public async Task<IActionResult> GetByIds([FromQuery] List<long> slotIds)
        {
            var result = await timeSlotService.GetByIds(slotIds);
            if (result.Any())
            {
                return Ok(new ResponseDto { Data = result, StatusCode = 200, Message = StringConstant.SuccessMessage, Success = true });
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

    }
}
