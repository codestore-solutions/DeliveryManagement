using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class KYC
    {
        [Key]
        public long Id { get; set; }
        public long AgentDetailId { get; set; }
        public enum DocumentTypes
        {
            DrivingLicence = 1,
            PanCard        = 2,
            AadharCard     = 3,
            Photo          = 4
        }

        [Required]
        public DocumentTypes DocumentType { get; set; }

        [Required]
        [Url]
        public string DocumentImage { get; set; } = null!;

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }

        public virtual AgentDetail AgentDetail { get; set; } = null!;
    }
}
