using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateAgentAvailabilityStatusDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long DeliveryAgentId { get; set; }
        public enum AvailabilityStatus
        {
            OffDuty = 0,
            OnDuty = 1,
        }

        [Required]
        public AvailabilityStatus AgentStatus { get; set; }
    }
}
