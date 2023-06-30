
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntityLayer.Models
{
    public class DeliveryAgent
    {
     
        [Key]
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = null!;

        [Required]
        [RegularExpression(@"^\d{10}$")]
        public string Phone { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        public enum Gender
        {
            Male,
            Female,
            Others
        }
        public Gender AgentGender { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        [DisplayFormat(DataFormatString = "{0:DDMMYY}")]
        public DateTime DateOfBirth { get; set; }

        public enum AvailabilityStatus
        {
            OnDuty,
            OffDuty
        }
        public AvailabilityStatus Status { get; set; }

        [StringLength(200)]
        public string? DrivingLicenseUrl { get; set; }

        [StringLength(200)]
        public string? PhotoUrl { get; set; }

        [StringLength(200)]
        public string? AadharCardUrl { get; set; }

        [StringLength(200)]
        public string? PancardUrl { get; set; }

        [Required]
        [StringLength(50)]
        public string VehicleType { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string VehicleModel { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string VehicleCompany { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string VehicleLicensePlate { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string RegistrationNumber { get; set; } = null!;
    }
}
