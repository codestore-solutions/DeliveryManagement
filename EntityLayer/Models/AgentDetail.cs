using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using static EntityLayer.Common.EnumConstants;

namespace EntityLayer.Models
{
    public class AgentDetail
    {
        [Key]
        public long Id { get; set; }

        // AgentId from User Module
        public long AgentId { get; set; }

        [Required]
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

        [Required]
        public bool IsProfileCompleted { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }

        public AvailabilityStatus AgentStatus { get; set; }
        public VerificationStatus verificationStatus { get; set; }

        // Navigation to references
        public virtual BankDetail? BankDetails { get; set; }
        public virtual ICollection<KYCDetail>? KYCs { get; set; } = new List<KYCDetail>();
        public virtual VehicleDetail? VehicleDetails { get; set; }
        public virtual ICollection<ServiceLocation> ServiceLocations { get; set; } = new List<ServiceLocation>();
    }
}
