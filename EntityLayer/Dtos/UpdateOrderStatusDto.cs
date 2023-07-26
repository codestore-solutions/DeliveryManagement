using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateOrderStatusDto
    {
        public int status { get; set; }
        public List<long> orders { get; set; } = new List<long>();
    }
}
