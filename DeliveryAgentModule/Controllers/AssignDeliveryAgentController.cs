using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using static System.Net.Mime.MediaTypeNames;
using System.Text;
using System.Text.Json;
using Azure;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using EntityLayer.Models;
using Newtonsoft.Json;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/assignAgent")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
   // [Authorize]
    public class AssignDeliveryAgentController : ControllerBase
    {
        private readonly IAssignDeliveryAgentService deliveryAgentService;
        private readonly HttpClient httpClient;

        public AssignDeliveryAgentController(IAssignDeliveryAgentService deliveryAgentService, HttpClient httpClient)
        {
            this.deliveryAgentService = deliveryAgentService;
            this.httpClient = httpClient;
        }

        /// <summary>
        /// Get all assigned agent list with orderId
        /// </summary>
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllAssignedAgent([FromQuery] int pageNumber=1, [FromQuery] int limit=10)
        {
            return Ok(await deliveryAgentService.GetAllAsync(pageNumber,limit));
        }


        /// <summary>
        /// Assign agent automatically according to the preffered working location by delivery Agent .
        /// </summary>
        /// <param name="assignAgentAutomaticallyDto"></param>
        /// <returns></returns>
        [HttpPost("automatically-assign-preview")]
        [ValidateModel]
        public async Task<IActionResult> AssignAgentAutomaticallyAsync(AssignAgentAutomaticallyDto assignAgentAutomaticallyDto)
        {
            return Ok(await deliveryAgentService.AssignAgentAutomaticallyAsync(assignAgentAutomaticallyDto));
        }


        /// <summary>
        /// Assign agent manually
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///      POST: /api/v1/assignAgent/assign-manually
        ///      
        /// </remarks>
        /// <param name="assignManuallyDto"></param>
        /// <returns></returns>
        [HttpPost("assign-manually")]
        [ValidateModel]
        public async Task<IActionResult> AssignAgentManuallyAsync(AssignManuallyDto assignManuallyDto)
        {
            var response = await deliveryAgentService.AssignAgentManuallyAsync(assignManuallyDto);

            using var client = new HttpClient();

            var requestBody = new UpdateOrderStatus();

            requestBody.orderStatus = 5;
            foreach (var obj in assignManuallyDto.List)
            {
                var order = new Order
                {
                    orderId         = obj.OrderId,
                    deliveryAgentId = obj.DeliveryAgentId,
                };
                requestBody.orders.Add(order);
            }

            HttpContent requestJson = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");
            // Add the authorization header with the token
            string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW4uc2hhaEBleGFtcGxlLmNvbSIsInJvbGUiOiIyIiwiaWQiOiIyIiwiYnVzaW5lc3NDYXRlZ29yeSI6IjEiLCJleHAiOjE2OTQ2Njg1NTd9.5o0-bpi-JluyVoztkzksonQRmCINzYjPYle6xVu4HHo";
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            var microserviceResponse =  client.PutAsync("https://order-processing-dev.azurewebsites.net/api/v1/order/updateOrderWithAgent", requestJson).Result;
            if (microserviceResponse.IsSuccessStatusCode)
            {
                return Ok(response);
            }
            else
            {          
                return NotFound(response);
            }
        }

        
        /// <summary>
        /// Accept or Reject Order by agent through Mobile App.
        /// </summary>
        /// <param name="acceptRejectOrderDto"></param>
        /// <returns></returns>
        [HttpPost("acceptOrReject")]
        public async Task<IActionResult> AcceptOrder([FromBody] AcceptRejectOrderDto acceptRejectOrderDto )
        {
            var result = await deliveryAgentService.AcceptOrderAsync(acceptRejectOrderDto);
            if(result.Success == false)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("CountDeliveredOrRejectedOrders")]
        public async Task<IActionResult> GetRejectedOrdersAsync([FromQuery][Required] long agentId)
        {
            var result = await deliveryAgentService.GetDeliveredOrRejectedOrdersCountAsync(agentId);
            return result == null ? NotFound(StringConstant.ResourceNotFoundError) : Ok(result);
        }


    }    
    
}

