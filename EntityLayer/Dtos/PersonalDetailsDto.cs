using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace EntityLayer.Dtos
{
    public class PersonalDetailsDto
    {

        [Required]
        [Range(1, long.MaxValue)]
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string FullName { get; set; } = null!;

        [Required]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\d{12}$")]
        public string PhoneNumber { get; set; } = null!;

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        [StringLength(10, MinimumLength = 1)]
        public string Gender { get; set; } = null!;

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; } = null!;
        public string ProfileImageUrl { get; set; } = string.Empty;
    }
}
