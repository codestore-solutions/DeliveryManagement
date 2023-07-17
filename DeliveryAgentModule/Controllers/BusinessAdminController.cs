using AutoMapper;
using BusinessLogicLayer.IServices;
using DeliveryAgent.API;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private readonly HttpClient httpClient;

        public BusinessAdminController(IBusinessAdminService businessAdminService, HttpClient httpClient)
        {
            this.businessAdminService = businessAdminService;
            this.httpClient = httpClient;
        }
      
    }
}
