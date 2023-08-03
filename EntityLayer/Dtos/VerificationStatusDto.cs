using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class VerificationStatusDto
    {
        public enum VerificationStatus
        {
            NotVerified = 0,
            Verified = 1
        }

        [Required]
        public VerificationStatus verificationStatus { get; set; }
    }
}
