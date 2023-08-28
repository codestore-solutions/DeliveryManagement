using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Models
{
    public class BankDetail
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [ForeignKey("AgentDetail")]
        public long AgentDetailId { get; set; }

        [Required]
        public string AccountHolderName { get; set; } = null!;

        [Required]
        public string BankName { get; set; } = null!;

        [Required]
        public string IFSCCode { get; set; } = null!;

        [Required]
        public string AccountNumber { get; set; } = null!;

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }
        public virtual AgentDetail AgentDetail { get; set; } = null!;
    }
}
