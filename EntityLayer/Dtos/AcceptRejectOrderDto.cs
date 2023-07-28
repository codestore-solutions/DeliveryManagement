﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class AcceptRejectOrderDto
    {
        public int OrderStatus { get; set; }
        public List<long> OrderIds { get; set; } = new List<long>();
    }
}
