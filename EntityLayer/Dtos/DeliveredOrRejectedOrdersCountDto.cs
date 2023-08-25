using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class DeliveredOrRejectedOrdersCountDto
    {
        [Required]
        [Range(0, int.MaxValue)]
        public int DeliveredOrdersCount { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int RejectedOrdersCount { get; set; }
    }
}
