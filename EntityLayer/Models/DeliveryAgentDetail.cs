using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace EntityLayer.Models
{
    public class DeliveryAgentDetail
    {
        [Required]
        [Key]
        public long Id { get; set; }

        [Required]
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(50,MinimumLength = 1)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Gender { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }

        public enum AvailabilityStatus
        {
            OnDuty  = 1,
            OffDuty = 0
        }
        public AvailabilityStatus Status { get; set; }

        [StringLength(200)]
        public string DrivingLicenseUrl { get; set; } = string.Empty;

        [StringLength(200)]
        public string PhotoUrl { get; set; } = string.Empty;

        [StringLength(200)]
        public string AadharCardUrl { get; set; } = string.Empty;

        [StringLength(200)]
        public string PancardUrl { get; set; } = string.Empty;

   
        [StringLength(50)]
        public string VehicleType { get; set; } = string.Empty;

        
        [StringLength(50)]
        public string VehicleModel { get; set; } = string.Empty;

        
        [StringLength(50)]
        public string VehicleCompanyName { get; set; } = string.Empty;

       
        [StringLength(20)]
        public string NumberPlate { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        public string VehicleImageUrl { get; set; } = string.Empty;

        public string RegistrationNumber { get; set; } = string.Empty;

        public string YourName { get; set; } = string.Empty;

        public string BankName { get; set; } = string.Empty;

        public string IFSCCode { get; set; } = string.Empty;

        [Required]
        public string AccountNumber { get; set; } = string.Empty;
    }
}
