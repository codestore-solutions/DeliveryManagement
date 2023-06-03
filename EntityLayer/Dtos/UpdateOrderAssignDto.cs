using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateOrderAssignDto
    {
        public int DeliveryAgentId { get; set; }
        public int OrderId { get; set; }
    }
}
