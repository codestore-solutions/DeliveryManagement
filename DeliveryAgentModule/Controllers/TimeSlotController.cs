using BusinessLogicLayer.IServices;
using DataAccessLayer.Repository;
using EntityLayer.Common;
using EntityLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

       /* [HttpGet]
        public IActionResult Get()
        {
            var ans = GetUserClaimDto();
            return Ok(ans);
        }*/
        /// <summary>
        /// Get list of all time slots.
        /// </summary>
        /// <param name="businessId"></param>
        /// <returns></returns>
        [HttpGet("getAllTimeSlots")]
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
        public async Task<ActionResult<ResponseDto>> UpdateMultipleSlotsStatus([FromQuery]List<long> ids, [FromQuery] bool isActive)
        {
            var result = await timeSlotService.UpdateMultipleSlotsStatus(ids, isActive);
            if (!result.IsNullOrEmpty())
            {
                return new ResponseDto { StatusCode = 200, Success = true, Data = result, Message = StringConstant.UpdatedMessage };
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

    }
}
