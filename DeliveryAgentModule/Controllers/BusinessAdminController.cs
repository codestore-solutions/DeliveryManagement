using AutoMapper;
using BuisnessLogicLayer.IServices;
using EntityLayer.Dtos;
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
    public class BusinessAdminController : ControllerBase
    {
        private readonly IBusinessAdminService businessAdminService;
        private readonly IMapper mapper;

        public BusinessAdminController(IBusinessAdminService businessAdminService, IMapper mapper)
        {
            this.businessAdminService = businessAdminService;
            this.mapper = mapper;
        }

        //GET: /api/business-admin/get-agents/1224?orderAssignedStatus=1&agentStatus=1&verStatus=0&pageNumber=1&limit=10
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
        [HttpGet("get-agents/{businessId}")]
        [MapToApiVersion("1.0")]
        public async Task<IEnumerable> GetAllDeliveryAgent([FromRoute] long businessId, [FromQuery] OrderAssignedStatus? orderAssignedStatus, 
            [FromQuery] DeliveryAgentStatus? agentStatus, [FromQuery] VerificationStatus? verStatus,[FromQuery] int pageNumber = 1, [FromQuery] int limit = 1000)
        {
            return await businessAdminService.GetDeliveryAgentAsync(businessId, orderAssignedStatus, agentStatus, verStatus, pageNumber, limit);
        }


        //GET: /api/business-admin/get-agents/1224?orderAssignedStatus=1&agentStatus=1&verStatus=0&pageNumber=1&limit=10
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
        [HttpGet("get-agents/{businessId}")]
        [MapToApiVersion("2.0")]
        public async Task<IEnumerable> GetAllDeliveryAgentUpdated([FromRoute] long businessId, [FromQuery] OrderAssignedStatus? orderAssignedStatus,
            [FromQuery] DeliveryAgentStatus? agentStatus, [FromQuery] VerificationStatus? verStatus, [FromQuery] int pageNumber = 1, [FromQuery] int limit = 1000)
        {
            return await businessAdminService.GetDeliveryAgentAsync(businessId, orderAssignedStatus, agentStatus, verStatus, pageNumber, limit);
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
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> AddingNewDeliveryAgent(VerifyAgentRequestDto verifyAgentRequest)
        {      
           return Ok(await businessAdminService.VerifyNewDeliveryAgentRequest(verifyAgentRequest));
        }

        /// <summary>
        /// Removes a specific Agent associated with Buisness
        /// </summary>
        [HttpDelete]
        [Route("{id}")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> DeleteDeliveryAgent(int id)
        {           
            return Ok(await businessAdminService.DeleteDeliveryAgentAsync(id));
        }

        /// <summary>
        /// Update agent verification status after verifying all documents
        /// </summary>
        /// <param name="agentId">Agent Id</param>
        /// <param name="verificationStatus">1:Verified, 0: NotVerfied</param>
        /// <returns></returns>
        [HttpPut]
        [MapToApiVersion("1.0")]
        public async Task<ResponseDto> UpdateVerificationStatus(long agentId,[FromQuery] VerificationStatus verificationStatus)
        {
           return await businessAdminService.UpdateVerificationSatus(agentId, verificationStatus);
        }

    }
}
