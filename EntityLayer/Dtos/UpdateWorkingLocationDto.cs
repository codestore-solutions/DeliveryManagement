using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateWorkingLocationDto
    {

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string LocationName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Address { get; set; } = null!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int MaxDistance { get; set; }

        [Required] 
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public string FromDay { get; set; } = null!;
        public string ToDay { get; set; } = string.Empty;
    }
}
