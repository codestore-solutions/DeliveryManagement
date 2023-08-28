using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public IEnumerable<object> UserClaims => HttpContext.User.Claims.Select(c => new { c.Type, c.Value }).ToList();
        protected UserClaimDto GetUserClaimDto()
        {
            var token = HttpContext.Request.Headers[AuthConstants.Authorization].ToString().Replace("Bearer ", "");
            if (string.IsNullOrWhiteSpace(token))
            {
                // throw new UnauthorizedAccessException(StringConstant.TokenMissing);
            }
            var user = User;
            if (user != null && user.FindFirst(AuthConstants.Id) != null)
            {
                var id = user.FindFirstValue(AuthConstants.Id);
                // Verify with user Module Needs to be integrated.
                return new UserClaimDto
                {
                    Token = token,
                    UserId = Convert.ToUInt64(id),
                    Email = user.FindFirstValue(AuthConstants.Email),
                    Name = user.FindFirstValue(AuthConstants.Name),
                    Role = user.FindFirstValue(AuthConstants.Role)
                };
            }
            return null;
        }
    }
}
