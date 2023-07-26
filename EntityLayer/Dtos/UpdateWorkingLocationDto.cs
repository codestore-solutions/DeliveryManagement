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
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string LocationName { get; set; } = null!;

        [Required]
        [StringLength(100, MinimumLength = 1)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string Address { get; set; } = null!;

        [Required]
        [DataType(DataType.Time)]
        [RegularExpression(@"^[0-2][0-9]:00$")]
        public string FromTime { get; set; } = null!;

        [Required]
        [DataType(DataType.Time)]
        [RegularExpression(@"^[0-2][0-9]:00$")]
        public string ToTime { get; set; } = null!;

        [Required]
        public List<string> SelectedDays { get; set; } = null!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
