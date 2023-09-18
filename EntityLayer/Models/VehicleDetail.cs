using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DeliveryAgent.Entities.Common.EnumConstants;

namespace DeliveryAgent.Entities.Models
{
    public class VehicleDetail
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [ForeignKey("AgentDetail")]
        public long AgentDetailId { get; set; }

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

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }
        public virtual AgentDetail AgentDetails { get; set; } = null!;
    }
}
