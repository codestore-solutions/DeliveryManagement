using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignAutomaticObjectDto
    {
        [Required]
        public long OrderId { get; set; } 

        [Required]
        public long VendorAddressId { get; set; } 

        [Required]
        public double PickupLatitude { get; set; }

        [Required]
        public double PickupLongitude { get; set; }

        [Required]
        public long DeliveryAddressId { get; set; } 

        [Required]
        public double DeliveryAddressLatitude { get; set; } 

        [Required]
        public double DeliveryAddressLongitude { get; set; }

    }

    public class AssignAgentAutomaticallyDto
    {
        public List<AssignAutomaticObjectDto> List { get; set; } = null!;
    }
    
}
