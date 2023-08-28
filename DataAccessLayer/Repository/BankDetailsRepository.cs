using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class BankDetailsRepository : GenericRepository<BankDetail>, IBankDetailsRepository
    {
        public BankDetailsRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}
