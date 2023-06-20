using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class ServiceLocation
    {
        public long Id { get; set; }
        public long DeliveryAgentId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
       
        public enum DeliveryAgentStatus
        {
            Availale = 1,
            NotAvailable = 0,
        }
        public enum OrderAssignedStatus
        {
            Assigned = 1,
            NotAssigned = 0
        }
        public OrderAssignedStatus OrderAssignStatus { get; set; }
        public DeliveryAgentStatus AgentStatus { get; set; }
        public int MaxDistance { get; set; }
    }
}
