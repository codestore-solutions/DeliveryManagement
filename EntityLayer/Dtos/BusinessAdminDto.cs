using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class BusinessAdminDto
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public long DeliveryAgentId { get; set; }
        enum DeliveryAgentStatus
        {
            Availale,
            NotAvailable,
            Assigned,
        }
        enum VerificationStatus
        {
            Verified,
            NotVerified,
            VerificationInProgress
        }
    }
}
