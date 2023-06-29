﻿
using EntityLayer.Models;

namespace EntityLayer.Dtos
{
    public class OrderAssingInBulkRequestDto
    {
        public List<long> OrderIds { get; set; } = null!;
        public List<double> PickupLatitudes { get; set; } = null!;
        public List<double> PickupLongitudes { get; set; } = null!;
        public List<double> DeliveryAddressLatitudes { get; set; } = null!;
        public List<double> DeliveryAddressLongitudes { get; set; } = null!;
        public long BusinessId { get; set; }
    }
}