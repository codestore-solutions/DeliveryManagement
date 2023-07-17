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
        public string VendorAddress { get; set; } = null!;

        [Required]
        public double PickupLatitude { get; set; }

        [Required]
        public double PickupLongitude { get; set; }

        [Required]
        public string DeliveryAddress { get; set; } = null!;

        [Required]
        public double DeliveryAddressLatitude { get; set; } 

        [Required]
        public double DeliveryAddressLongitude { get; set; }

    }

    public class AssignAgentAutomaticallyDto
    {
        public List<AssignAutomaticObjectDto> List { get; set; } = null!;
        /*[Required]
        public List<long> OrderIds { get; set; } = null!;

        [Required]
        public List<string> VendorAddresses { get; set; } = null!;

        [Required]
        public List<double> PickupLatitudes { get; set; } = null!;

        [Required]
        public List<double> PickupLongitudes { get; set; } = null!;

        [Required]
        public List<string> DeliveryAddresses { get; set; } = null!;

        [Required]
        public List<double> DeliveryAddressLatitudes { get; set; } = null!;

        [Required]
        public List<double> DeliveryAddressLongitudes { get; set; } = null!;*/

    }
    
}
