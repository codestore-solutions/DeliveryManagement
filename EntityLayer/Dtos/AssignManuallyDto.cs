using System.ComponentModel.DataAnnotations;
using static DeliveryAgent.Entities.Common.EnumConstants;

namespace DeliveryAgent.Entities.Dtos
{
    public class AssignManuallyObjectDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long AgentId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long OrderId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long VendorAddressId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double PickupLatitude { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double PickupLongitude { get; set; }

        [Required]
        public long DeliveryAddressId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double DeliveryAddressLatitude { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double DeliveryAddressLongitude { get; set; }

        [Required]
        public OrderStatus orderStatus { get; set; }
    }
    public class AssignManuallyDto
    {
        public List<AssignManuallyObjectDto> List { get; set; } = null!;

    }
}
