using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class BulkAssignManuallyDto
    {
        public List<long> DeliveryAgentId { get; set; } = null!;
        public List<long> OrderIds { get; set; } = null!;
        public List<double> PickupLatitudes { get; set; } = null!;
        public List<double> PickupLongitudes { get; set; } = null!;
        public List<double> DeliveryAddressLatitudes { get; set; } = null!;
        public List<double> DeliveryAddressLongitudes { get; set; } = null!;
        public long BusinessId { get; set; }
    }
}
