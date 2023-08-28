using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class AgentDetailsRepository : GenericRepository<AgentDetail>, IAgentDetailsRepository
    {
        public AgentDetailsRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}
