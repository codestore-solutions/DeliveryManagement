using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class VehicleDetails
    {
        [Key]
        public long Id { get; set; }

        public long AgentDetailId { get; set; }
        public enum VehicleTypes
        {
            Motorcycle = 1,
            Scooter    = 2,
            GearlessMotorcycle = 3,
            Scooty = 4
        }
        public VehicleTypes VehicleType { get; set; }

        [Required]
        [StringLength(50)]
        public string VehicleModel { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string Company { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string ManufacturedYear { get; set; } = null!;

        [Required]
        [StringLength (200)]
        public string VehicleImage { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string RegistrationNumber { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public virtual AgentDetail AgentDetail { get; set; } = null!;
    }
}
