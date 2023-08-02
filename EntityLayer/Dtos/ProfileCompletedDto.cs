using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class ProfileCompletedDto
    {
        public long AgentId { get; set; }
        public bool IsProfileCompleted { get; set; }
    }
}
