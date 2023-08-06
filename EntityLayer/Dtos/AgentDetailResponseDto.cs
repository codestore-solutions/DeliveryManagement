using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static EntityLayer.Common.EnumConstants;

namespace EntityLayer.Dtos
{
    public class AgentDetailResponseDto
    {
        public class AgentDetailResponseDTO
        {
            [Key]
            public long Id { get; set; }

            // AgentId from User Module
            public long AgentId { get; set; }

            [Required]
            public string FullName { get; set; } = null!;

            [Required]
            public string CountryCode { get; set; } = null!;

            [Required]
            public string PhoneNumber { get; set; } = null!;

            [Required]
            [EmailAddress]
            public string Email { get; set; } = null!;

            [Required]
            public string Gender { get; set; } = null!;

            [Required]
            [DataType(DataType.Date)]
            public DateTime DateOfBirth { get; set; }

            [Required]
            public string Address { get; set; } = null!;
            public string ProfileImage { get; set; } = string.Empty;

            [Required]
            public bool IsProfileCompleted { get; set; }

            [Required]
            public DateTime CreatedOn { get; set; }

            [Required]
            public DateTime UpdatedOn { get; set; }

            public AvailabilityStatus AgentStatus { get; set; }
            public VerificationStatus verificationStatus { get; set; }
        }
    }
}
