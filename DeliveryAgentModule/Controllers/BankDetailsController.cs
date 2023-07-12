﻿using BusinessLogicLayer.IServices;
using BusinessLogicLayer.Services;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/bank-details")]
    [ApiController]
    public class BankDetailsController : ControllerBase
    {
        private readonly IBankDetailsService bankDetailsService;

        public BankDetailsController(IBankDetailsService bankDetailsService)
        {
            this.bankDetailsService = bankDetailsService;
        }

        /// <summary>
        /// Get Bank details by agent Id.
        /// </summary>
        /// <param name="agentId"></param>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<IActionResult> GetBankDetailAsync([FromQuery][Required] long agentId)
        {
            return Ok(await bankDetailsService.GetAsync(agentId));
        }

        /// <summary>
        /// Add bank details for delivery agent.
        /// </summary>
        /// <param name="bankDetailsDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        public async Task<IActionResult> AddBankDetailsAsync([FromBody] BankDetailsDto bankDetailsDto)
        {
            return Ok(await bankDetailsService.AddDetailsAsync(bankDetailsDto));
        }

        /// <summary>
        /// Update bank details for delivery agent.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="bankDetailsDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        [ValidateModel]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id, [FromBody] BankDetailsDto bankDetailsDto)
        {
            var result = await bankDetailsService.UpdateDetailsAsync(id, bankDetailsDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

    }
}
