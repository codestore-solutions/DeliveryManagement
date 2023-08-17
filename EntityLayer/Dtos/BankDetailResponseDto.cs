using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class BankDetailResponseDto
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string AccountHolderName { get; set; } = null!;

        [Required]
        public string BankName { get; set; } = null!;

        [Required]
        public string IFSCCode { get; set; } = null!;

        [Required]
        public string AccountNumber { get; set; } = null!;

    }
}
