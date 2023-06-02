
using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class AgentAssign
    {
        [Key]
        [Required]      
        public int Id { get; set; }

        [Required]
        public int DeliveryAgentId { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public long BuisnessId { get; set; }

    }
}
