using DeliveryAgent.Entities.Models;
using System.ComponentModel.DataAnnotations;
using static DeliveryAgent.Entities.Common.EnumConstants;

namespace DeliveryAgent.Entities.Dtos
{
    public class AgentAllDetailsDto
    {
        public long Id { get; set; }

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

        public AvailabilityStatus AgentStatus { get; set; }
        public VerificationStatus verificationStatus { get; set; }

        // Navigation to references
        public BankDetail BankDetails { get; set; } = null!;
        public  List<KYCDetail> KYCs { get; set; } = new List<KYCDetail>();
        public VehicleDetail VehicleDetails { get; set; } = null!;
        public  List<ServiceLocation> ServiceLocations { get; set; } = new List<ServiceLocation>();
    }


}
