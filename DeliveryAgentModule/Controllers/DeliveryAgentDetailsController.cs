using BusinessLogicLayer.IServices;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Net.WebSockets;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/agentDetail")]
    [ApiController]
    public class DeliveryAgentDetailsController : ControllerBase
    {
        private readonly IAgentDetailsService agentDetailsService;

        public DeliveryAgentDetailsController(IAgentDetailsService agentDetailsService)
        {
            this.agentDetailsService = agentDetailsService;
        }

        /// <summary>
        /// Get agent Details By agentId.
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAgentDetailAsync([FromQuery][Required] long agentId)
        {
            return Ok(await agentDetailsService.GetAgentDetailAsync(agentId));
        }

        /// <summary>
        /// Add or update details of a delivery agent.
        /// </summary>
        /// <param name="agentDetailsDto"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> AddOrEditAgentDetailsAsync([FromBody] AgentDetailsDto agentDetailsDto)
        {
            return Ok(await agentDetailsService.AddOrEditAgentDetailsAsync(agentDetailsDto));
        }

    }
}
