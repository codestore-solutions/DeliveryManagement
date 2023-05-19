
namespace EntityLayer.Models
{
    public class OrderAssign
    {
        public int Id { get; set; }
        public int DeliveryAgentId { get; set; }
        public int OrderId { get; set; }
        enum IsOrderDelivered
        {
            Yes,
            No
        }       
       
    }
}
