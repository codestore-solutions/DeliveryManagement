
using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class AssignDeliveryAgent
    {
        [Key]     
        public long Id { get; set; }

        [Required]
        public long DeliveryAgentId { get; set; }

        [Required]
        public List<Order> Orders { get; set; } = new List<Order>();   
        public int OrdersCount { get; set; }

        [Required]
        public double PickupLatitude { get; set; }

        [Required]
        public double PickupLongitude { get; set; }

        [Required]
        public double DeliveryAddressLatitude { get; set; }

        [Required]
        public double DeliveryAddressLongitude { get; set; }

        [Required]
        public long BusinessId { get; set; }

    }
}

