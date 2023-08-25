using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost("AgentLogin")]
        [Authorize(Roles = "5")]
        [ValidateModel]
        public async Task<IActionResult> SignInAsync([FromBody][Required] LoginRequestDto loginRequestDto)
        {
            var result = await accountService.SignInAsync(loginRequestDto);
            if (result != null)
            {
                return Ok(new { token = result });
            }
            return BadRequest(new { message = StringConstant.InvalidCredentialError });
        }

        [HttpPost("BusinessAdminLogin")]
        [Authorize(Roles = "2")]
        [ValidateModel]
        public async Task<IActionResult> AdminSignInAsync([FromBody][Required] LoginRequestDto loginRequestDto)
        {
            var result = await accountService.SignInAsync(loginRequestDto);
            if (result != null)
            {
                return Ok(new { token = result });
            }
            return BadRequest(new { message = StringConstant.InvalidCredentialError });
        }
    }
}
