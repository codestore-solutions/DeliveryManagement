using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class singleAssignResponse
    {
        public long AgentId { get; set; }
        public string Status { get; set; } = null!;
        public DateTime Timestamp { get; set; }
        public long OrderId { get; set; }
    }
}
