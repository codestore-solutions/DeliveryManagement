using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.Entities.Models
{
    public class AgentTimeSlot
    {
        public long Id { get; set; }

        [Required]
        public long TimeSlotId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        // References to Service Location Table
        public long ServiceLocationId { get; set; }
        public virtual ServiceLocation? ServiceLocation { get; set; }
    }
}
