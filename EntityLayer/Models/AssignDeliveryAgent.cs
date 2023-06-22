
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
        public List<Order> Orders { get; set; }= new List<Order>();   
        public int OrdersCount { get; set; }
        public double PickupLatitude { get; set; }
        public double PickupLongitude { get; set; }
        public double DeliveryAddressLatitude { get; set; }
        public double DeliveryAddressLongitude { get; set; }
        public long BusinessId { get; set; }

    }
}

