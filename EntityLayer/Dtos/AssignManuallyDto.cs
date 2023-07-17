using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignManuallyObjectDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long DeliveryAgentId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long OrderId { get; set; }

        [Required]
        public string VendorAddress { get; set; } = null!;

        [Required]
        [Range(0, double.MaxValue)]
        public double PickupLatitude { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double PickupLongitude { get; set; }

        [Required]
        public string DeliveryAddress { get; set; } = null!;

        [Required]
        [Range(0, double.MaxValue)]
        public double DeliveryAddressLatitude { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double DeliveryAddressLongitude { get; set; }
    }
    public class AssignManuallyDto
    {
        public List<AssignManuallyObjectDto> List { get; set; } = null!;

    }
}
