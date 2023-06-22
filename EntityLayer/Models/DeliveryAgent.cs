
using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class DeliveryAgent
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Address { get; set; }
        public string ContactNumber { get; set; } = null!;
        public string Region { get; set; } = null!;
        public string Email { get; set; } = null!; 
        public long? ServiceLocationId { get; set; }  
    }
}
