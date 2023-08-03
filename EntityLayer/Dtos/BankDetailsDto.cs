using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class BankDetailsDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long AgentId { get; set; }

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string AccountHolderName { get; set; } = null!;

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string BankName { get; set; } = null!;

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string IFSCCode { get; set; } = null!;

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string AccountNumber { get; set; } = null!;
     
    }
}
