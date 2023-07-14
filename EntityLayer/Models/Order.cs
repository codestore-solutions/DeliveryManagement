
using System.Net.Sockets;

namespace EntityLayer.Models
{
    public class Order
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public long AssignDeliveryAgentId { get; set; }
        public AssignDeliveryAgent AssignDeliveryAgent { get; set; } = null!;

    }
}
