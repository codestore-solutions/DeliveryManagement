using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class BulkAssignResponseDto
    {
        public List<long?> AgentId { get; set; } = new List<long?>();
        public List<string> AgentName { get; set; } = new List<string>();
        public string Status { get; set; } = null!;
        public DateTime  Timestamp { get; set; }
        public List<long> Orders { get; set; } = new List<long>();

    }
}
