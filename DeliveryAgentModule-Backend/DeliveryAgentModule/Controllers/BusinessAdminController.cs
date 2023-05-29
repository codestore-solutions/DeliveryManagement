using AutoMapper;
using BuisnessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/business-admin")]
    [ApiController]
    [Produces("application/json")]
    public class BusinessAdminController : ControllerBase
    {
        private readonly IBusinessAdminService businessAdminService;
        private readonly IMapper mapper;

        public BusinessAdminController(IBusinessAdminService businessAdminService, IMapper mapper)
        {
            this.businessAdminService = businessAdminService;
            this.mapper = mapper;
        }

        //GET: /api/business-admin/GetAll/1224?orderAssignedStatus=1&agentStatus=1&verStatus=0&pageNumber=1&limit=10
        /// <summary>
        /// Get All Delivery Agent List associated with Buisness
        /// </summary>
        /// <param name="id">BuisnessId</param>
        /// <param name="orderAssignedStatus">0:NotAssigned, 1:Assigned </param>
        /// <param name="agentStatus">0:NotAvailable, 1:Available</param>
        /// <param name="verStatus">0:NotVerifed, 1:Verified, 2:Pending</param>
        /// <param name="pageNumber"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [HttpGet("GetAll/{id}")]
        public async Task<IEnumerable> GetAllDeliveryAgent([FromRoute] long id,[FromQuery] OrderAssignedStatus orderAssignedStatus, [FromQuery] DeliveryAgentStatus agentStatus, [FromQuery] VerificationStatus verStatus,[FromQuery] int pageNumber = 1, [FromQuery] int limit = 1000)
        {
            return await businessAdminService.GetDeliveryAgentAsync(id, orderAssignedStatus, agentStatus, verStatus, pageNumber, limit);
        }

        // POST: /api/businessAdmin/verify-new-agent-request
        /// <summary>
        /// Verify new Delivery Agent , requested from mobile app
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /api/business-admin/verify-new-agent-request
        ///     {
        ///        "deliveryAgentId"    : integer
        ///        "buisnessId"         : long,
        ///     }
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>

        [HttpPost("verify-new-agent-request")]
        public async Task<IActionResult> AddingNewDeliveryAgent(VerifyAgentRequestDto verifyAgentRequest)
        {      
           return Ok(await businessAdminService.VerifyNewDeliveryAgentRequest(verifyAgentRequest));
        }

        /// <summary>
        /// Removes a specific Agent associated with Buisness
        /// </summary>
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteDeliveryAgent(int id)
        {
            
            return Ok(await businessAdminService.DeleteDeliveryAgentAsync(id));
        }

        /// <summary>
        /// Update agent verification status after verifying all documents
        /// </summary>
        /// <param name="id">Agent Id</param>
        /// <param name="verificationStatus">1:Verified, 0: NotVerfied</param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateVerificationStatus(long id,[FromQuery] VerificationStatus verificationStatus)
        {
            await businessAdminService.UpdateVerificationSatus(id, verificationStatus);
            return Ok("Status updated successfully");
        }

    }
}
