﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class ServiceLocation
    {
        public long ServiceLocationId { get; set; }

        [Required]
        public long DeliveryAgentId { get; set; }
        public string LocationName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int MaxDistance { get; set; }

        [DataType(DataType.Time)]
        public DateTime StartTime { get; set; }

        [DataType(DataType.Time)]
        public DateTime EndTime { get; set; }
        public long WorkingLocationId { get; set; }
        public WorkingLocation WorkingLocation { get; set; } = null!;
        public ICollection<SelectedDay> SelectedDays { get; set; } = new List<SelectedDay>(); 
    }
}
