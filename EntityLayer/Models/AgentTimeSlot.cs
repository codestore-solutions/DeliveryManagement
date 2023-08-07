using Castle.Components.DictionaryAdapter;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
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
