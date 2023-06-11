using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateBusinessAdminDto
    {
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
