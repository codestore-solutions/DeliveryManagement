using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class BusinessAdmin
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public long BusinessId { get; set; }
        public int DeliveryAgentId  { get; set; }
        public string? DeliveryAgentName { get; set; }
        public string? DeliveryAgentAddress { get; set; }
        public string? ShippingAddress { get; set; }                   // Shipping Address against orderId
        public int? ServiceLocationId { get; set; }                    // DeliveryAgent Live-Location: Latitude /Longitude
        public double Latitude { get; set; }                           // Admin Latitude/order-pickup latitude/ restaurant latitude 
        public double Longitude { get; set; }   
        public enum DeliveryAgentStatus
        {
            Availale=1,
            NotAvailable=0,
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
            VerificationInProgress=2
        }   
        public OrderAssignedStatus OrderAssignStatus { get; set; }    
        public DeliveryAgentStatus AgentStatus { get; set; }    
        public VerificationStatus VerStatus { get; set; }  
        public ServiceLocation? ServiceLocation { get; set; }
    }
}
