
using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class AssignDeliveryAgent
    {
        [Key]
        [Required]      
        public long Id { get; set; }

        [Required]
        public long DeliveryAgentId { get; set; }

        [Required]
        public long OrderId { get; set; }

        [Required]
        public long BuisnessId { get; set; }

    }
}
