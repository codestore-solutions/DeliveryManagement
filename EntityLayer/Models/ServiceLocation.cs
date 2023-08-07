using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class ServiceLocation
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string LocationName { get; set; } = null!;
        public long AgentDetailId { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; } = null!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }

       /* [Required]
        public TimeSpan StartTime { get; set; } 

        [Required]
        public TimeSpan EndTime { get; set; }*/

        // Represent Active Working Location 
        [Required]
        public bool IsActive { get; set; }                                

        [Required]
        public string SelectedDays { get; set; } = null!;

        // References
        public virtual AgentDetail AgentDetails { get; set; } = null!;
        public virtual ICollection<AgentTimeSlot> AgentTimeSlots { get; set;} = new List<AgentTimeSlot>(); 
       
    }
}
