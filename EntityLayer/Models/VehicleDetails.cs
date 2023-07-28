﻿using System;
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

        [Required]
        public long DeliveryAgentId { get; set; }

        [Required]  
        [StringLength(50)]
        public string VehicleType { get; set; } = null!;


        [Required]
        [StringLength(50)]
        public string Model { get; set; } = null!;


        [Required]
        [StringLength(50)]
        public string CompanyName { get; set; } = null!;


        [Required]
        [StringLength(50)]
        public string DLNumber { get; set; } = null!;

        [Required]
        [StringLength (200)]
        public string VehicleImageUrl { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string RegistrationNumber { get; set; } = null!;
    }
}
