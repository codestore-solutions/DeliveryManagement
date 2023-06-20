using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AssignMultipleOrderDto
    {
        public List<long> OrderIds { get; set; } = null!;
        public long DeliveryAgentId { get; set;}
        public long BuisnessId { get; set; }
    }
}
