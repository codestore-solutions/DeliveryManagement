using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class KYCDto
    {
        [Required]
        [Range(1, long.MaxValue)]    
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(200)]
        public string DrivingLicenseUrl { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string PhotoUrl { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string AadharCardUrl { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string PancardUrl { get; set; } = null!;
    }
}
