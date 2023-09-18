using BusinessLogicLayer.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
