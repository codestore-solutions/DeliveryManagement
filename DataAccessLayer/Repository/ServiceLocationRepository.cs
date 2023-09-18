using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class ServiceLocationRepository : GenericRepository<ServiceLocation>,IServiceLocationRepository
    {
        private readonly DeliveryDbContext dbContext;
        public ServiceLocationRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }

    }
}
