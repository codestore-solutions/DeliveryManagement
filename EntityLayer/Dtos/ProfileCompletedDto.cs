using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class ProfileCompletedDto
    {

        [Required]
        [Range(1, long.MaxValue)]    
        public long AgentId { get; set; }

        [Required]
        public bool IsProfileCompleted { get; set; }
    }
}
