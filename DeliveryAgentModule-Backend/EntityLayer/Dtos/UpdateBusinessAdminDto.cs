using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class UpdateBusinessAdminDto
    {
        public int Id { get; set; }
        public int DeliveryAgentId { get; set; }
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
