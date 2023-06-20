using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignManuallyDto
    {
        [DataType(DataType.Text)]
        [RegularExpression("^[0-9]+$", ErrorMessage = "The property must be a valid long number.")]
        public long DeliveryAgentId { get; set; }
        public List<long> OrderIds { get; set; } = null!;
        public double PickupLat { get; set; }
        public double PickupLong { get; set; }
        public double DeliveryAddressLat { get; set; }
        public double DeliveryAddressLong { get; set; }
        public long BuisnessId { get; set; }

    }
}
