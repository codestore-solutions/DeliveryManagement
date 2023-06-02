
namespace EntityLayer.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string? ShippingAddress { get; set; }
        public double? OrderAmount { get; set; }
        public enum PaymentType
        {
            COD=1,
            OnlinePayment=2
        }

        public enum DeliveryType
        {
            NormalDelivery=0,
            FastDelivery=1
        }

        public enum IsOrderAssigned
        {
            No=0,
            Yes=1
        }
        public DeliveryType deliveryType { get; set; }
        public IsOrderAssigned isOrderAssigned { get; set; }
        public PaymentType paymentType { get; set; }      
        public BusinessAdmin? BusinessAdmin { get; set; }
    }
}
