using AutoMapper;
using BuisnessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static EntityLayer.Models.BusinessAdmin;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/businessAdmin")]
    [ApiController]
    public class BusinessAdminController : ControllerBase
    {
        private readonly IBusinessAdminService businessAdminService;
        private readonly IMapper mapper;

        public BusinessAdminController(IBusinessAdminService businessAdminService, IMapper mapper)
        {
            this.businessAdminService = businessAdminService;
            this.mapper = mapper;
        }

        //GET: /api/businessAdmin/GetAllAgentList?orderAssignedStatus=1&agentStatus=1&pageNumber=1&limit=10

        [HttpGet("GetAllAgentList")]
        public async Task<IEnumerable> GetAllDeliveryAgent([FromQuery] OrderAssignedStatus? orderAssignedStatus, [FromQuery] DeliveryAgentStatus? agentStatus,[FromQuery] int pageNumber = 1, [FromQuery] int limit = 1000)
        {
            return await businessAdminService.GetDeliveryAgentAsync(orderAssignedStatus,agentStatus, pageNumber, limit);
        }

        [HttpPost]
        public async Task<IActionResult> AddingNewDeliveryAgent(CreateBusinessAdminDto createBuisnessAdminDto)
        {
           await businessAdminService.AddNewDeliveryAgentAsync(createBuisnessAdminDto);
           return Ok(createBuisnessAdminDto);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteDeliveryAgent(int id)
        {
            
            return Ok(await businessAdminService.DeleteDeliveryAgentAsync(id));
        }

    }
}
