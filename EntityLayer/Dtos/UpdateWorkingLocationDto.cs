using System.ComponentModel.DataAnnotations;

namespace DeliveryAgent.Entities.Dtos
{
    public class UpdateWorkingLocationDto
    {
        [Required]
        [StringLength(50, MinimumLength = 1)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string LocationName { get; set; } = null!;

        [Required]
        [StringLength(100, MinimumLength = 1)]
        [RegularExpression(@"^[A-Za-z0-9.:,/ -]+$")]
        public string Address { get; set; } = null!;

        [Required]
        public List<long> TimeSlotIds { get; set; } = new List<long>();

        [Required]
        public List<string> SelectedDays { get; set; } = null!;

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
