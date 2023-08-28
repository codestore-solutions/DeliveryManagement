using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class AvailabilityStatusDto
    {
        public enum AvailabilityStatus
        {
            OffDuty = 0,
            OnDuty = 1,
            Busy = 2,
        }

        [Required]
        public AvailabilityStatus AgentStatus { get; set; }
    }
}
