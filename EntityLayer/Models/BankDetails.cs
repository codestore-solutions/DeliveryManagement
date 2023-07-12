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

        [Required]
        [Range(1, long.MaxValue)]    
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(100)]
        public string YourName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string BankName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string IFSCCode { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string AccountNumber { get; set; } = null!;
    }
}
