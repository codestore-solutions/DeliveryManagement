using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class KYCRepository : GenericRepository<KYCDetail>, IKYCRepository
    {
        public KYCRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}
