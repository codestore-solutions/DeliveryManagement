using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AutomaticallyAssignResponseDto
    {
        public long? DeliveryAgentId { get; set; }
        public string? DeliveryAgentName { get; set; }
        public long OrderId { get; set; }
    }
}
