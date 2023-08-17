using BusinessLogicLayer.IServices;
using EntityLayer.Dtos;
using Newtonsoft.Json;
using System.Text;

namespace BusinessLogicLayer.Services
{
    public class AccountService : IAccountService
    {
        private readonly HttpClient httpClient;

        public AccountService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<string?> SignInAsync(LoginRequestDto loginRequestDto)
        {
            var userData = new
            {
                Username = loginRequestDto.Username,
                Password = loginRequestDto.Password,
            };

            string jsonData = JsonConvert.SerializeObject(userData);
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync("https://app-deliveryagent-dev.azurewebsites.net/api/v1/testing/login", content);
            if (response.IsSuccessStatusCode)
            {
                string data = await response.Content.ReadAsStringAsync();
                var dataObj = JsonConvert.DeserializeObject<LoginResponseDto>(data);
                if(dataObj != null)
                {
                    return dataObj.JwtToken;
                }
            }
            return null;
        }
    }
}
