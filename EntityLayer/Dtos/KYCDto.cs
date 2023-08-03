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

        public enum DocumentTypes
        {
            DrivingLicence = 1,
            PanCard = 2,
            AadharCard = 3,
            Photo = 4
        }

        [Required]
        public DocumentTypes DocumentType { get; set; }

        [Required]
        public string DocumentImage { get; set; } = null!;
    }
}
