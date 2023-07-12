using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AddNewWorkingLocationDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long DeliveryAgentId { get; set; }

        [Required]
        [StringLength(50)]
        public string LocationName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Address { get; set; } = null!;

        [Required]
        [DataType(DataType.Time)]
        public string FromTime { get; set; } = null!;

        [Required]
        public string ToTime { get; set; } = null!;
         
        [Required]
        public List<string> SelectDays { get; set; } = null!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }

    }
}
