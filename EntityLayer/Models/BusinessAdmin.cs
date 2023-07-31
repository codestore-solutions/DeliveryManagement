using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class BusinessAdmin
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public long BusinessId { get; set; }

        [Required]
        public long DeliveryAgentId  { get; set; }
    }
}
