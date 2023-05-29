using DataAccessLayer.IRepository;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthenticationController(UserManager<IdentityUser> userManager,ITokenRepository tokenRepository)
        {           
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }
        //Post: /api/authentication/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            var identityUser = new IdentityUser
            {
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username
            };

            var identityResult = await userManager.CreateAsync(identityUser, registerRequestDto.Password);

            if (identityResult.Succeeded)
            {
                identityResult = await userManager.AddToRolesAsync(identityUser, registerRequestDto.Roles);

                if (identityResult.Succeeded)
                {
                    return Ok("User was Registered! Please Login.");
                }
            }

            return BadRequest("Something Went Wrong");
        }

        //POST: /api/authentication/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Username);

            if (user != null)
            {
                //Now Check Password
                var checkPassResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

                if(checkPassResult)
                {
                    var roles= await userManager.GetRolesAsync(user);
                    if(roles != null)
                    {
                        // Create Token
                        var jwtToken = tokenRepository.CreateJWTToken(user, roles.ToList());

                        var response = new LoginResponseDto
                        {
                            JwtToken = jwtToken,
                        };

                        return Ok(response);
                    }
                    
                }
            }

            return BadRequest("Username or Password Incorrect");
        }

    }
}
