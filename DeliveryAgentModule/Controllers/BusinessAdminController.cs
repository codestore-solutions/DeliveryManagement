using AutoMapper;
using BusinessLogicLayer.IServices;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/business-admin")]
    [ApiController]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Authorize]
    public class BusinessAdminController : ControllerBase
    {
        private readonly IBusinessAdminService businessAdminService;
        private readonly IMapper mapper;
        public BusinessAdminController(IBusinessAdminService businessAdminService, IMapper mapper)
        {
            this.businessAdminService = businessAdminService;
            this.mapper = mapper;
        }
      
        /// <summary>
        /// Get All Delivery Agent List associated with Buisness
        /// </summary>
        /// <param name="businessId">BuisnessId</param>
        /// <param name="orderAssignedStatus">0:NotAssigned, 1:Assigned </param>
        /// <param name="agentStatus">0:NotAvailable, 1:Available</param>
        /// <param name="verStatus">0:NotVerifed, 1:Verified, 2:Pending</param>
        /// <param name="pageNumber"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        //GET: /api/business-admin/get-agents/1224?orderAssignedStatus=1&agentStatus=1&verStatus=0&pageNumber=1&limit=10
        [HttpGet("get-agents/{businessId}")]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable> GetAllDeliveryAgentAsync([FromRoute] long businessId, [FromQuery] OrderAssignedStatus? orderAssignedStatus, 
            [FromQuery] DeliveryAgentStatus? agentStatus, [FromQuery] VerificationStatus? verStatus,[FromQuery] int pageNumber = 1, [FromQuery] int limit = 10)
        {
            return await businessAdminService.GetAllDeliveryAgentAsync(businessId, orderAssignedStatus, agentStatus, verStatus, pageNumber, limit);
        }
      
        // DELETE: /api/delete/{agentId}
        /// <summary>
        /// Removes a specific Agent associated with Buisness
        /// </summary>
        [HttpDelete]
        [Route("delete/{agentId}")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteDeliveryAgentAsync(long agentId)
        {           
            await businessAdminService.DeleteDeliveryAgentAsync(agentId);
            return Ok(StringConstant.SuccessMessage);
        }

        // PUT: /api/v1/buisness-admin/update-verification-status
        /// <summary>
        /// Update agent verification status after verifying all documents
        /// </summary>
        /// <param name="agentId">Agent Id</param>
        /// <param name="verificationStatus">1:Verified, 0: NotVerfied</param>
        /// <returns></returns>
        [HttpPut("update-verification-status")]
        [MapToApiVersion("1.0")]
        public async Task<ResponseDto> UpdateVerificationStatusAsync(long agentId,[FromQuery] VerificationStatus verificationStatus)
        {
           return await businessAdminService.UpdateVerificationSatus(agentId, verificationStatus);
        }

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
        // POST: /api/businessAdmin/verify-new-agent-request
        [HttpPost("verify-new-agent-request")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddingNewDeliveryAgentAsync(VerifyAgentRequestDto verifyAgentRequest)
        {
            return Ok(await businessAdminService.VerifyNewDeliveryAgentRequest(verifyAgentRequest));
        }

        /// <summary>
        /// Version V2: Get All Delivery Agent List associated with Buisness
        /// </summary>
        /// <param name="businessId">BuisnessId</param>
        /// <param name="orderAssignedStatus">0:NotAssigned, 1:Assigned </param>
        /// <param name="agentStatus">0:NotAvailable, 1:Available</param>
        /// <param name="verStatus">0:NotVerifed, 1:Verified, 2:Pending</param>
        /// <param name="pageNumber"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        //GET: /api/business-admin/get-agents/1224?orderAssignedStatus=1&agentStatus=1&verStatus=0&pageNumber=1&limit=10
        [HttpGet("get-agents/{businessId}")]
        [MapToApiVersion("2.0")]
        public async Task<IEnumerable> GetAllDeliveryAgentUpdatedAsync([FromRoute] long businessId, [FromQuery] OrderAssignedStatus? orderAssignedStatus,
            [FromQuery] DeliveryAgentStatus? agentStatus, [FromQuery] VerificationStatus? verStatus, [FromQuery] int pageNumber = 1, [FromQuery] int limit = 1000)
        {
            return await businessAdminService.GetAllDeliveryAgentAsync(businessId, orderAssignedStatus, agentStatus, verStatus, pageNumber, limit);
        }


    }
}
