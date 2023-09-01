﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class UpdateOrderStatusDto
    {
        [Required]
        public int status { get; set; }
        public List<long> orders { get; set; } = new List<long>();
    }

    public class Order
    {
        public long orderId { get; set; }
        public long deliveryAgentId { get; set; }
    }
    public class UpdateOrderStatus
    {
        public int orderStatus { get; set; }
        public List<Order> orders { get; set; } = new List<Order>();
    }
}