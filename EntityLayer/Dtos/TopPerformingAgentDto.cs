using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class TopPerformingAgentDto
    {
        public long AgentId { get; set; }
        public string AgentName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int DeliveryCount { get; set; }
        public string Region { get; set; } = string.Empty;

    }
}
