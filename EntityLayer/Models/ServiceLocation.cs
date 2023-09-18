using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeliveryAgent.Entities.Models
{
    public class ServiceLocation
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string LocationName { get; set; } = null!;

        [ForeignKey("AgentDetail")]
        public long AgentDetailId { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; } = null!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        // Represent Active Working Location 
        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string SelectedDays { get; set; } = null!;

        public virtual ICollection<AgentTimeSlot> AgentTimeSlots { get; set; } = new List<AgentTimeSlot>();

        // References
        public virtual AgentDetail AgentDetails { get; set; } = null!;

    }
}
