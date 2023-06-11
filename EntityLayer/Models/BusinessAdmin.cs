using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class BusinessAdmin
    {
        [Key]
        [Required]
        public long Id { get; set; }

        [Required]
        public long BusinessId { get; set; }

        [Required]
        public long DeliveryAgentId  { get; set; }
        public string? DeliveryAgentName { get; set; }
        public string? DeliveryAgentAddress { get; set; }
        public string? ShippingAddress { get; set; }                    // Shipping Address against orderId
        public long? ServiceLocationId { get; set; }                    // DeliveryAgent Live-Location: Latitude /Longitude                                                                  // Latitude & Longitude are applicable only for Instant Food Delivery Business
        public double Latitude { get; set; }                            // Admin Latitude/order-pickup latitude/ restaurant latitude 
        public double Longitude { get; set; }   
        public enum DeliveryAgentStatus
        {
            Availale=1,
            Offline=0,
            Busy =2,
        }
        public enum OrderAssignedStatus
        {
            Assigned=1,
            NotAssigned=0
        }
        public enum VerificationStatus
        {
            Verified = 1,
            NotVerified=0,
            Pending=2
        }   
        public OrderAssignedStatus OrderAssignStatus { get; set; }    
        public DeliveryAgentStatus AgentStatus { get; set; }    
        public VerificationStatus VerStatus { get; set; }  
    }
}
