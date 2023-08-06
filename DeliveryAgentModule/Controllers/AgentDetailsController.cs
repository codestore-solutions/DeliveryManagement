using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using static EntityLayer.Models.AgentDetail;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/personal-details")]
    [ApiController]
    public class AgentDetailsController : ControllerBase
    {
        private readonly IAgentDetailsService agentDetailsService;

        public AgentDetailsController(IAgentDetailsService agentDetailsService)
        {
            this.agentDetailsService = agentDetailsService;
        }

        /// <summary>
    /// Get Agent details by agent Id.
    /// </summary>
    /// <remarks>
    /// Sample response:
    ///
    ///     GET: /api/v1/personal-details/get?agentId=4001
    ///     {
    ///         "id": 1,
    ///         "agentId": 4001,
    ///         "fullName": "sonu",
    ///         "phoneNumber": "5724213308",
    ///         "email": "sonu@example.com",
    ///         "gender": "Male",
    ///         "dateOfBirth": "2023-07-10T00:00:00"
     ///     }
    /// </remarks>
    /// <param name="agentId"></param>
    /// <returns></returns>
        [HttpGet("get")]
       // [Authorize(Roles = "2,5")]
        public async Task<ActionResult<ResponseDto>> GetAgentDetailAsync([FromQuery][Required] long agentId)
        {
            var result = await agentDetailsService.GetPersonalDetailsAsync(agentId);
            if(result != null)
            {
                return result;
            }
            return NotFound(new { message = StringConstant.ResourceNotFoundError });
        }

        /// <summary>
        /// Get list of agents associated with Business Admin
        /// </summary>
        /// <param name="agentStatus" example="0:Off Duty , 1: On Duty"></param>
        /// <param name="filterOn"></param>
        /// <param name="filterQuery"></param>
        /// <param name="pageNumber"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet("getAgentsList")]
        //[Authorize(Roles = "2")]
        public async Task<IActionResult> GetAllDetailsAsync([FromQuery] string? filterQuery, [FromQuery] int? agentStatus
        , [FromQuery] int pageNumber = 1, [FromQuery] int limit = 10)
        {
            var result = await agentDetailsService.GetAllDetailsAsync(filterQuery, agentStatus, pageNumber, limit);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        /// <summary>
        /// Get Individual Agent Details like Vehicle , personal , kyc , Bank details by agent Id.
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("getDetails")]
        //[Authorize(Roles = "2")]
        public async Task<IActionResult> GetDetailByAgentId(long agentId)
        {
            var result = await agentDetailsService.GetDetailByAgentId(agentId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        /// <summary>
        /// Add personal details of a delivery agent.
        /// </summary>
        /// <param name="agentDetailsDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        //[Authorize(Roles = "5")]
        public async Task<IActionResult> AddPersonaltDetailsAsync([FromBody][Required] AgentDetailsDto agentDetailsDto)
        {
            var result = await agentDetailsService.AddDetailsAsync(agentDetailsDto);
            return result == null ? BadRequest(new { message = StringConstant.ExistingMessage }) : Ok(result);
        }

        /// <summary>
        /// Update personal details for delivery agent.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="agentDetailsDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        [ValidateModel]
       // [Authorize(Roles = "5")]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id,[FromBody] AgentDetailsDto agentDetailsDto)
        {
            var result = await agentDetailsService.UpdateDetailsAsync(id, agentDetailsDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        /// <summary>
        /// Fetching multiple agent details required in Order Processing Module.
        /// </summary>
        /// <param name="agentIds"></param>
        /// <returns></returns>
        [HttpGet("getMultipleAgent")]
        public async Task<IActionResult> GetMultipleAgentsList([FromQuery] List<long> agentIds)
        {
            var result = await agentDetailsService.GetMultipleAgentsList(agentIds);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        [HttpPut("updateProfileCompletedStatus")]
        public async Task<IActionResult> AddProfileCompletedStatusAsync(UpdateProfileCompletedDto updateProfileCompletedDto)
        {
            var result = await agentDetailsService.AddProfileCompletedStatusAsync(updateProfileCompletedDto);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }

        [HttpGet("getProfileCompletedStatus")]
        public async Task<IActionResult> GetProfileCompletedStatusAsync([FromQuery]long agentId)
        {
            var result = await agentDetailsService.GetProfileCompletedStatusAsync(agentId);
            return result == null ? NotFound(new { message = StringConstant.ResourceNotFoundError }) : Ok(result);
        }
    }
}
