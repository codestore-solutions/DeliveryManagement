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
            VehicleDetailsRepository = new VehicleDetailsRepository(this.dbContext);
            BankDetailsRepository = new BankDetailsRepository(this.dbContext);
            KYCRepository = new KYCRepository(this.dbContext);
            AgentDetailsRepository = new AgentDetailsRepository(this.dbContext);
            AssignDeliveryAgentRepository = new AssignDeliveryAgentRepository(this.dbContext);
            ServiceLocationRepository = new ServiceLocationRepository(this.dbContext);
            BusinessAdminRepository=new BusinessAdminRepository(this.dbContext);  
            ImageRepository= new ImageRepository(this.dbContext);
        }
        public IAssignDeliveryAgentRepository AssignDeliveryAgentRepository
        {
            get;
            private set;
        }
        public IServiceLocationRepository ServiceLocationRepository { get; private set; }

        public IBusinessAdminRepository BusinessAdminRepository { get; private set; }

        public IImageRepository ImageRepository { get; private set; }

        public IAgentDetailsRepository AgentDetailsRepository { get; private set; }

        public IVehicleDetailsRepository VehicleDetailsRepository { get; private set; }

        public IBankDetailsRepository BankDetailsRepository { get; private set; }

        public IKYCRepository KYCRepository { get; private set; }

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
            int result = await dbContext.SaveChangesAsync();
            if(result>0)
            {
                return true;
            }
            return false;
        }

    }
}
