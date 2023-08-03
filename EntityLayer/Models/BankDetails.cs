using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class BankDetails
    {
        [Key]
        public long Id { get; set; }
        public long AgentDetailId { get; set; }

        [Required]
        [StringLength(100)]
        public string AccountHolderName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string BankName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string IFSCCode { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string AccountNumber { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }   
        public virtual AgentDetail AgentDetail { get; set; } = null!;
    }
}
