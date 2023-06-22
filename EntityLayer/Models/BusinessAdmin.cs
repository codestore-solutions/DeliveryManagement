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
        public string DeliveryAgentName { get; set; } = null!;
        public string DeliveryAgentAddress { get; set; } = null!;
        public double AgentLatitude { get; set; }                            
        public double AgentLongitude { get; set; }
        public int MaxDistance { get; set; }
        public enum DeliveryAgentStatus
        {
            Offline = 0,
            Availale =1,
            Busy =2,
        }
        public enum OrderAssignedStatus
        {
            Assigned=1,
            NotAssigned=0
        }
        public OrderAssignedStatus OrderAssignStatus { get; set; }    
        public DeliveryAgentStatus AgentStatus { get; set; }

    }
}
