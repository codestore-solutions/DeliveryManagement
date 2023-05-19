using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class ServiceLocation
    {
        public int Id { get; set; }
        public int DeliveryAgentId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        enum ServiceArea
        {
            Circular,
            Square,
            Hexagon
        }
        public int MaxDistance { get; set; }
        public List<DeliveryAgent>? DeliveryAgents { get; set; }


    }
}
