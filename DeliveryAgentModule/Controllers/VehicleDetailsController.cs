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
    [Route("api/v{version:apiVersion}/vehicle-details")]
    [ApiController]
    public class VehicleDetailsController : ControllerBase
    {
        private readonly IVehicleDetailsService vehicleDetailsService;

        public VehicleDetailsController(IVehicleDetailsService vehicleDetailsService)
        {
            this.vehicleDetailsService = vehicleDetailsService;
        }

        /// <summary>
        /// Get Vehicle details by agent Id.
        /// </summary>
        /// <param name="agentId" example ="4001"></param>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<IActionResult> GetAgentDetailAsync([FromQuery][Required] long agentId)
        {
            var result = await vehicleDetailsService.GetAsync(agentId);
            if(result == null)
            {
                return NotFound(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

        /// <summary>
        /// Add vehicle details for delivery agent.
        /// </summary>
        /// <param name="vehicleDetailsDto"></param>
        /// <returns></returns>
        [HttpPost("add")]
        [ValidateModel]
        public async Task<IActionResult> AddVehicleDetailsAsync([FromBody][Required] VehicleDetailsDto vehicleDetailsDto)
        {
            var result = await vehicleDetailsService.AddDetailsAsync(vehicleDetailsDto);        
            if(result == null)
            {
                return BadRequest(StringConstant.ExistingMessage);
            }
            return Ok(result);
        }

        /// <summary>
        /// Update vehicle details for delivery agent.
        /// </summary>
        /// <param name="id" placeholder ="Table Id"></param>
        /// <param name="vehicleDetailsDto"></param>
        /// <returns></returns>
        [HttpPut("update")]
        [ValidateModel]
        public async Task<IActionResult> UpdateDetailsAsync([FromQuery][Required] long id, [FromBody] VehicleDetailsDto vehicleDetailsDto)
        {
            var result = await vehicleDetailsService.UpdateDetailsAsync(id, vehicleDetailsDto);
            if (result == null)
            {
                return BadRequest(StringConstant.InvalidInputError);
            }
            return Ok(result);
        }

    }
}
