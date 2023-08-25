using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using static EntityLayer.Common.EnumConstants;

namespace EntityLayer.Models
{
    public class KYCDetail
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [ForeignKey("AgentDetail")]
        public long AgentDetailId { get; set; }

        // Enum
        [Required]
        public DocumentTypes DocumentType { get; set; }

        [Required]
        public string DocumentImage { get; set; } = null!;

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }
        public virtual AgentDetail AgentDetails { get; set; } = null!;
    }
}
