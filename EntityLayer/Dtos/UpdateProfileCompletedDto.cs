using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class UpdateProfileCompletedDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long AgentId { get; set; }

        [Required]
        [Range(0, 1)]
        public bool IsProfileCompleted { get; set; }
    }
}
