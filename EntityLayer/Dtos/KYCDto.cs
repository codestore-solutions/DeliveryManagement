using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static EntityLayer.Common.EnumConstants;

namespace EntityLayer.Dtos
{
    public class KYCDto
    {
        [Required]
        [Range(1, long.MaxValue)]    
        public long AgentId { get; set; }

        // Enum For Document Types
        [Required]
        public DocumentTypes DocumentType { get; set; }

        [Required]
        public string DocumentImage { get; set; } = null!;
    }
}
