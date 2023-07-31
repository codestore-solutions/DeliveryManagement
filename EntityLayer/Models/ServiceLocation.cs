using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class ServiceLocation
    {
        [Key]
        public long ServiceLocationId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(50)]
        public string LocationName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Address { get; set; } = null!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        [Required]
        public int MaxDistance { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; } 

        [Required]
        public TimeSpan EndTime { get; set; } 
         
        [Required]
        public bool IsActive { get; set; }                                // Represent Active Working Location 

        [Required]
        public string SelectedDays { get; set; } = null!;
        public enum AvailabilityStatus
        {
            OffDuty = 0,
            OnDuty = 1,
            Busy = 2,
        }
        public AvailabilityStatus AgentStatus { get; set; }

        public enum VerificationStatus
        {
            NotVerified = 0,
            Verified = 1
        }
        public VerificationStatus verificationStatus { get; set; }
    }
}
