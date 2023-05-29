using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class VerifyAgentRequestDto
    { 
        public int DeliveryAgentId { get; set; }
        public long BusinessId { get; set; }
    }
}
