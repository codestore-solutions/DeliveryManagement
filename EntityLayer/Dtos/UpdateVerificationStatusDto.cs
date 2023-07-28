using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateVerificationStatusDto
    {
        public long DeliveryAgentId { get; set; }
        public enum VerificationStatus
        {
            NotVerified = 0,
            Verified = 1
        }
        public VerificationStatus verificationStatus { get; set; }
    }
}
