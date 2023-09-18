using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class UpdatePickupOrDeliveryStatusDto
    {
        [Required]
        public string Image { get; set; } = string.Empty;

        [Required]
        public int DeliveryStatus { get; set; }

        [Required]
        public List<long> OrderIds { get; set; } = new List<long>();
    }
}
