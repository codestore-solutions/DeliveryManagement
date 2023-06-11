using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateAgentRequestDto
    {
        public long DeliveryAgentId { get; set; }
        public long OrderId { get; set; }
        public long BusinessId { get; set; }
    }
}
