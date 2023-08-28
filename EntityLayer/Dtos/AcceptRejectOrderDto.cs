using DeliveryAgent.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class AcceptRejectOrderDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public int DeliveryStatus { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = StringConstant.OrderIdRequiredError)]
        public List<long> OrderIds { get; set; } = new List<long>();
    }
}
