using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignAgentAutomaticallyDto
    {
        public long OrderId { get; set; }
        public double PickupLat { get; set; }
        public double PickupLong { get; set; }
        public double DeliveryAddressLat { get; set; }
        public double DeliveryAddressLong { get; set; }
        public long BusinessId { get; set; }
    }
    
}
