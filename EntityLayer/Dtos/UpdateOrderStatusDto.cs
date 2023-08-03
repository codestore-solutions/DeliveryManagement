using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateOrderStatusDto
    {
        [Required]
        public int status { get; set; }
        public List<long> orders { get; set; } = new List<long>();
    }
}
