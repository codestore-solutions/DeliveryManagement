using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.Entities.Dtos
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
