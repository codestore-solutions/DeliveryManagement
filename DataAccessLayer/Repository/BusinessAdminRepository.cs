using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class BusinessAdminRepository : GenericRepository<BusinessAdmin>, IBusinessAdminRepository
    {
        private readonly DeliveryDbContext dbContext;
        public BusinessAdminRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }


    }
}
