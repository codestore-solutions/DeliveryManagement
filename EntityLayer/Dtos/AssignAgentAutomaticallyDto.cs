using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignAgentAutomaticallyDto
    {

        [Required]
        public long OrderId { get; set; }

        [Required]
        public double PickupLatitude { get; set; }                          // Vendor Latitude4

        [Required]
        public double PickupLongitude { get; set; }                         // Vendor Longitude

        [Required]
        public double DeliveryAddressLatitude { get; set; }                 // Customer Shipping/Delivery Latitude

        [Required]
        public double DeliveryAddressLongitude { get; set; }                // Customer Shipping/Delivery Longitude

        [Required]
        public long BusinessId { get; set; }
        
    }
    
}
