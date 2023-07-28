using BusinessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Net.Http;
using DeliveryAgentModule.CustomActionFilter;
using Newtonsoft.Json.Linq;
using EntityLayer.Common;
using System.ComponentModel.DataAnnotations;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/testing")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class TestController : ControllerBase
    {
        
        private readonly HttpClient httpClient;

        public TestController(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        [HttpPost("login")]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> Login([FromBody][Required] LoginRequestDto loginRequestDto)
        {
            var microserviceResponse = await httpClient.GetAsync("https://order-processing-dev.azurewebsites.net/api/v1/users/listAllUsers");
            if(microserviceResponse == null)
            {
                return BadRequest(StringConstant.ErrorMessage);
            }
            var content = await microserviceResponse.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject <MyDataClass>(content);
  
              foreach (var item in data.Data)
              {
                Console.WriteLine(item.Email);
                if (IsValidCredentials(item.Email, item.Password, loginRequestDto))
                {
                    
                    var jwtToken = GenerateJwtToken(item.Email, item.Role, item.Id, item.BusinessCategory);

                    var responseDto = new LoginResponseDto
                    {
                        JwtToken         = jwtToken,
                        Name             = item.Name,
                        Id               = item.Id,
                        Email            = item.Email,
                        BusinessCategory = item.BusinessCategory,
                    };
                    // Return the JWT token to the client 
                    return Ok(responseDto);
                }
              }
            return BadRequest(StringConstant.InvalidInputError);         
        }
        private bool IsValidCredentials(string email, string password, LoginRequestDto loginRequestDto)
        {
            if (loginRequestDto.Username == email && loginRequestDto.Password == password)
            {
                return true;
            }
            return false;
        }
        private string GenerateJwtToken(string email, string role, string id, string businessCategory)
        {    
            // Set the secret key used to sign the JWT token 
            var secretKey = "safmdknfsdDKFKN122sdnmkfnsJDKNF23234Sssds";
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var signingKey = new SymmetricSecurityKey(keyBytes);

            // Create the claims for the token
          
            
            if(role == "2")
            {
                var claims = new[]
                {
                new Claim("email", email),
                new Claim("role", role),
                new Claim("id", id),
                new Claim("businessCategory", businessCategory)
                };
                // Create the JWT token
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMonths(2),                 // Set the token expiration time
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );

                // Serialize the token to a string
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenString = tokenHandler.WriteToken(token);
                return tokenString;
            }
            else
            {
                var claims = new[]
                {
                new Claim("email", email),
                new Claim("role", role),
                new Claim("id", id),
                };
                // Create the JWT token
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMonths(2),                 // Set the token expiration time
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );

                // Serialize the token to a string
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenString = tokenHandler.WriteToken(token);
                return tokenString;
            }

        }


}

}
