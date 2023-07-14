using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateActiveAddressDto
    {
        [Required]
        [Range(1, long.MaxValue)]    
        public long ServiceLocationId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]   
        public long DeliveryAgentId { get; set; }

        [Required]
        [Range(0 ,1)]
        public bool IsActive { get; set; }  
    }
}
