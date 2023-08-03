using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class VehicleDetailsDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long AgentId { get; set; }
        public enum VehicleTypes
        {
            Motorcycle = 1,
            Scooter = 2,
            GearlessMotorcycle = 3,
            Scooty = 4
        }

        [Required]
        [Range (1, 4)]
        public VehicleTypes VehicleType { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 1)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string VehicleModel { get; set; } = null!;


        [Required]
        [StringLength(25)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string Company { get; set; } = null!;


        [Required]
        [StringLength(10, MinimumLength = 4)]
        [RegularExpression(@"^[0-9]+$")]
        public string ManufacturedYear { get; set; } = null!;

        [Required]
        [DataType(DataType.ImageUrl)]
        [Url]
        public string VehicleImage { get; set; } = null!;

        [Required]
        [StringLength(25)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string RegistrationNumber { get; set; } = null!;
    }
}
