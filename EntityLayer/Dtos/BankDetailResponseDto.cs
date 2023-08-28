using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.Entities.Dtos
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
