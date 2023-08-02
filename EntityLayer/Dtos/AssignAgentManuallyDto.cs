using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignAgentManuallyDto
    {
        [Required]
        public long AgentId { get; set; } 

        [Required]
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
        public List<double> DeliveryAddressLongitudes { get; set; } = null!;
    }
}
