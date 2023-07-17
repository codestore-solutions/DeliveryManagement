using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using static EntityLayer.Models.PersonalDetails;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/personal-details")]
    [ApiController]
    public class PersonalDetailsController : ControllerBase
    {
        private readonly IPersonalDetailsService personalDetailsService;

        public PersonalDetailsController(IPersonalDetailsService personalDetailsService)
        {
            this.personalDetailsService = personalDetailsService;
        }

        /// <summary>
    /// Get Personal details by agent Id.
    /// </summary>
    /// <remarks>
    /// Sample response:
    ///
    ///     GET: /api/v1/personal-details/get?agentId=4001
    ///     {
    ///         "id": 1,
    ///         "deliveryAgentId": 4001,
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
        public async Task<IActionResult> GetAgentDetailAsync([FromQuery][Required] long agentId)
        {
            return Ok(await personalDetailsService.GetPersonalDetailsAsync(agentId));
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
        public async Task<IActionResult> GetAllDetailsAsync([FromQuery] string? filterOn, [FromQuery] string? filterQuery, [FromQuery] int? agentStatus
        , [FromQuery] int pageNumber = 1, [FromQuery] int limit = 10)
        {
            return Ok(await personalDetailsService.GetAllDetailsAsync( filterOn, filterQuery, agentStatus, pageNumber, limit));   
        }

        /// <summary>
        /// Get Individual Agent Details like Vehicle , personal , kyc , Bank details by agent Id.
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("getDetails")]
        [Authorize]
        public async Task<IActionResult> GetDetailByAgentId(long agentId)
        {
            return Ok(await personalDetailsService.GetDetailByAgentId(agentId));
        }

        /// <summary>
        /// Add personal details of a delivery agent.
        /// </summary>
        /// <param name="agentDetailsDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        public async Task<IActionResult> AddPersonaltDetailsAsync([FromBody] PersonalDetailsDto agentDetailsDto)
        {
            return Ok(await personalDetailsService.AddDetailsAsync(agentDetailsDto));
        }

        /// <summary>
        /// Update personal details for delivery agent.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="agentDetailsDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        [ValidateModel]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id,[FromBody] PersonalDetailsDto agentDetailsDto)
        {
            var result = await personalDetailsService.UpdateDetailsAsync(id, agentDetailsDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

       
    }
}
