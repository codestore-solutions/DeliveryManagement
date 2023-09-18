using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Dtos
{
    public class UpdateVerificationStatusDto
    {

        [Required]
        [Range(1, long.MaxValue)]
        public long AgentId { get; set; }
        public enum VerificationStatus
        {
            NotVerified = 0,
            Verified = 1,
            Pending = 2
        }

        [Required]
        [Range(0, 2)]
        public VerificationStatus verificationStatus { get; set; }
    }
}
