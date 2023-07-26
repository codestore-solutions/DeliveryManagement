
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
        public long OrderId { get; set; }

        [Required]
        public long VendorAddressId { get; set; } 

        [Required]
        public double PickupLatitude { get; set; }

        [Required]
        public double PickupLongitude { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }

      
        [Required]
        public long DeliveryAddressId { get; set; }

        [Required]
        public double DeliveryAddressLatitude { get; set; }

        [Required]
        public double DeliveryAddressLongitude { get; set; }

        public enum OrderStatus
        {
            Assigned = 5,
            Accepted = 6,
            Rejected = 7,
            Ongoing = 8,
            Delivered = 9,
        }
        public OrderStatus orderStatus { get; set; }

    }
}

