using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public IEnumerable<object> UserClaims => HttpContext.User.Claims.Select(c => new { c.Type, c.Value }).ToList();

    }
}
