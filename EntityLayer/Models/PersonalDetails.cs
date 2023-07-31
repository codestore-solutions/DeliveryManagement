using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace EntityLayer.Models
{
    public class PersonalDetails
    { 
        [Key]
        public long Id { get; set; }

        [Required]
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string FullName { get; set; } = null!;

        [Required]
        public string CountryCode { get; set; } = null!;

        [Required]
        public string PhoneNumber { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Gender { get; set; } = null!;

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; } = null!;

        public string ProfileImageUrl { get; set; } = string.Empty;
    }
}
