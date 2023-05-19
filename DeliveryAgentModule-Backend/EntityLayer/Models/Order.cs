using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public PaymentType paymentType { get; set; }      
        public BusinessAdmin? BusinessAdmin { get; set; }
    }
}
