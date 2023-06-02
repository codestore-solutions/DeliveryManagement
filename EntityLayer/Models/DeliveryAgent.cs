
using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class DeliveryAgent
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; }= null!;
        public string ContactNo { get; set; } = null!;
        public int? ServiceLocationId { get; set; }  
        public ServiceLocation? ServiceLocation { get; set; } 
    }
}
