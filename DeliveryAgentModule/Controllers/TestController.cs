using DataAccessLayer.IRepository;
using DataAccessLayer.Repository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
using DeliveryAgentModule.CustomActionFilter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/testing")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class TestController : ControllerBase
    {

        private readonly HttpClient httpClient;
        private readonly IUnitOfWork unitOfWork;

        public TestController(HttpClient httpClient, IUnitOfWork unitOfWork)
        {
            this.httpClient = httpClient;
            this.unitOfWork = unitOfWork;
        }

        [HttpPost("login")]
        [MapToApiVersion("1.0")]
        [ValidateModel]
        public async Task<IActionResult> Login([FromBody][Required] LoginRequestDto loginRequestDto)
        {
            var microserviceResponse = await httpClient.GetAsync("https://order-processing-dev.azurewebsites.net/api/v1/users/listAllUsers");
            if (!microserviceResponse.IsSuccessStatusCode)
            {
                return BadRequest(new { message = StringConstant.MicroserviceError });
            }
            
            var content = await microserviceResponse.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<MyDataClass>(content);
            if (data == null)
            {
                return NotFound(new { message = StringConstant.ResourceNotFoundError });
            }
            List<string> existingUsers;
            existingUsers = unitOfWork.AgentDetailsRepository.GetAllAsQueryable().Where(u => !u.IsDeleted).Select(u => u.AgentId.ToString()).ToList();
            foreach (var item in data.Data)
            {
                //check if user doesnot exist here or is deleted then return Error
                if (existingUsers != null && existingUsers.Contains(item.Id) && IsValidCredentials(item.Email, item.Password, loginRequestDto))
                {
                    var jwtToken = GenerateJwtToken(item);
                    var responseDto = new LoginResponseDto
                    {
                        JwtToken = jwtToken,
                        Name = item.Name,
                        Id = item.Id,
                        Email = item.Email,
                        BusinessCategory = item.BusinessCategory,
                    };
                    // Return the JWT token to the client 
                    return Ok(responseDto);
                }
            }
            return BadRequest(new { message = StringConstant.InvalidCredentialError });
        }
        private bool IsValidCredentials(string email, string password, LoginRequestDto loginRequestDto)
        {
            if ((loginRequestDto.Username.ToLower() == email) && loginRequestDto.Password == password)
            {
                return true;
            }
            return false;
        }
        private string GenerateJwtToken(DataClass item)
        {
            // Set the secret key used to sign the JWT token 
            var secretKey = "safmdknfsdDKFKN122sdnmkfnsJDKNF23234Sssds";
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var signingKey = new SymmetricSecurityKey(keyBytes);

            // Create the claims for the token
            if (item.Role == "2")
            {
                var claims = new[]
                {
                new Claim("email", item.Email),
                new Claim("role", item.Role),
                new Claim("id", item.Id),
                new Claim("businessCategory", item.BusinessCategory),
                new Claim("name" , item.Name)
                };
                // Create the JWT token
                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMonths(2),
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
                new Claim("email", item.Email),
                new Claim("role", item.Role),
                new Claim("id", item.Id),
                new Claim("name" , item.Name)
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
