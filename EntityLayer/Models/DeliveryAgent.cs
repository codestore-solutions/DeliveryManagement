
using System.ComponentModel.DataAnnotations;

namespace EntityLayer.Models
{
    public class DeliveryAgent
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; }= null!;
        public string ContactNumber { get; set; } = null!;
        public string Region { get; set; } = null!;
        public string Email { get; set; } = null!;
        public enum AvailabilityStatus
        {
            Available = 1,
            Offline = 2,
            Busy = 3
        }

        public AvailabilityStatus AvailabeStatus { get; set; }
        public long? ServiceLocationId { get; set; }  

    }
}
