using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdatePickupOrDeliveryStatusDto
    {
        public string Image { get; set; } = string.Empty;
        public int DeliveryStatus { get; set; }
        public List<long> OrderIds { get; set; } = new List<long>();
    }
}
