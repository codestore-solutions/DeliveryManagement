using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class DeliveredOrRejectedOrdersCountDto
    {
        public int DeliveredOrdersCount { get; set; }
        public int RejectedOrdersCount { get; set; }
    }
}
