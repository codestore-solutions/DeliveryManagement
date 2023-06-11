using DataAccessLayer.Data;
using DataAccessLayer.IRepository;

namespace DataAccessLayer.Repository
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly DeliveryDbContext dbContext;
        public UnitOfWork(DeliveryDbContext dbContext)
        {
            this.dbContext = dbContext;
            AssignDeliveryAgentRepository = new AssignDeliveryAgentRepository(this.dbContext);
            ServiceLocationRepository = new ServiceLocationRepository(this.dbContext);
            BusinessAdminRepository=new BusinessAdminRepository(this.dbContext);
            OrderRepository= new OrderRepository(this.dbContext);   
            ImageRepository= new ImageRepository(this.dbContext);
        }
        public IAssignDeliveryAgentRepository AssignDeliveryAgentRepository
        {
            get;
            private set;
        }
        public IServiceLocationRepository ServiceLocationRepository { get; private set; }

        public IBusinessAdminRepository BusinessAdminRepository { get; private set; }

        public IOrderRepository OrderRepository { get; private set; }

        public IImageRepository ImageRepository { get; private set; }

        public void Dispose()
        {
            dbContext.Dispose();
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public async Task<bool> SaveAsync()
        {
            await dbContext.SaveChangesAsync();
            return true;
        }

    }
}
