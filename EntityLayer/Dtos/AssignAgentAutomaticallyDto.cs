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
        [Range(1, long.MaxValue)]
        public long OrderId { get; set; } 

        [Required]
        [Range(1, long.MaxValue)]
        public long VendorAddressId { get; set; } 

        [Required]
        [Range(0, double.MaxValue)]
        public double PickupLatitude { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double PickupLongitude { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long DeliveryAddressId { get; set; } 

        [Required]
        [Range(0, double.MaxValue)]
        public double DeliveryAddressLatitude { get; set; } 

        [Required]
        [Range(0, double.MaxValue)]
        public double DeliveryAddressLongitude { get; set; }

    }

    public class AssignAgentAutomaticallyDto
    {
        public List<AssignAutomaticObjectDto> List { get; set; } = null!;
    }
    
}
