
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;

namespace EntityLayer.Models
{
    public class Order
    {
        public long Id { get; set; }

        [Required]
        public long OrderId { get; set; }

        [Required]
        public string DeliveryAddress { get; set; } = null!;

        [Required]
        public double DeliveryAddressLatitude { get; set; }

        [Required]
        public double DeliveryAddressLongitude { get; set; }

        [Required]
        public long AssignDeliveryAgentId { get; set; }
        public AssignDeliveryAgent AssignDeliveryAgent { get; set; } = null!;

    }
}
