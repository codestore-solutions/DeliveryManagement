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
    public class AgentDetail
    {
        [Key]
        public long Id { get; set; }
        public long AgentId { get; set; }

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
        public string ProfileImage { get; set; } = string.Empty;
        public bool IsProfileCompleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public virtual BankDetails? BankDetails { get; set; }
        public virtual ICollection<KYC>? KYCs { get; set; } = new List<KYC>();
        public virtual VehicleDetails? VehicleDetails { get; set; } 
    }
}
