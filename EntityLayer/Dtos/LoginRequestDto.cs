using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class LoginRequestDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
