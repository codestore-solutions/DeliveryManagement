
using System.ComponentModel.DataAnnotations;
using static EntityLayer.Common.EnumConstants;

namespace EntityLayer.Models
{
    public class AssignDeliveryAgent
    {
        [Key]     
        public long Id { get; set; }

        [Required]
        public long AgentId { get; set; }

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

        [Required]
        public string PickupImage { get; set; } = string.Empty;

        [Required]
        public string DeliveryImage { get; set; } = string.Empty;
       
        public DeliveryStatus DeliveryStatus { get; set; }

    }
}

