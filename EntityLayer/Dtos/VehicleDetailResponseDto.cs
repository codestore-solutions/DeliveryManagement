using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static EntityLayer.Common.EnumConstants;

namespace EntityLayer.Dtos
{
    public class VehicleDetailResponseDto
    {
        public long Id { get; set; }

        public VehicleTypes VehicleType { get; set; }

        [Required]
        public string VehicleModel { get; set; } = null!;

        [Required]
        public string Company { get; set; } = null!;

        [Required]
        public string ManufacturedYear { get; set; } = null!;

        [Required]
        public string VehicleImage { get; set; } = null!;

        [Required]
        public string RegistrationNumber { get; set; } = null!;
    }
}
