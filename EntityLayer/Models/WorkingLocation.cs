using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class WorkingLocation
    {
        public long WorkingLocationId { get; set; }
        public long DeliveryAgentId { get; set; }
        public ICollection<ServiceLocation> ServiceLocations { get; set; } = new List<ServiceLocation>();  // List of all service locations e.g.Home, Work
        
    }
}
