using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DeliveryAgent.Entities.Common.EnumConstants;

namespace DeliveryAgent.Entities.Dtos
{
    public class KYCListDto
    {
        [Required]
        public List<KYCDto> List { get; set; } = null!;
    }
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
