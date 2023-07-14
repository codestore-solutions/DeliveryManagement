using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class LoginResponseDto
    {
        public string JwtToken { get; set; } = null!;
        public string Id { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? BusinessCategory { get; set; }
    }
}
