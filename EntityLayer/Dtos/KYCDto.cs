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
        public long AgentId { get; set; }

        [Required]
        [StringLength(200)]
        public string DrivingLicense { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string Photo { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string AadharCard { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string Pancard { get; set; } = null!;
    }
}
