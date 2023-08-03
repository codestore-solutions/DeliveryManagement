using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class LoginResponseDto
    {
        [Required]
        public string JwtToken { get; set; } = null!;

        [Required]
        public string Id { get; set; } = null!;

        [Required]
        public string Email { get; set; } = null!;

        public string? BusinessCategory { get; set; }

        [Required]
        public string Name { get; set; } = null!;
    }
}
