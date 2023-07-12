
namespace DataAccessLayer.IRepository
{
    public interface IUnitOfWork: IDisposable
    {
        public IVehicleDetailsRepository VehicleDetailsRepository { get; }
        public IBankDetailsRepository BankDetailsRepository { get; }    
        public IKYCRepository KYCRepository { get; }    
        public IPersonalDetailsRepository PersonalDetailsRepository { get; }
        public IImageRepository ImageRepository { get; }
        public IBusinessAdminRepository BusinessAdminRepository { get; }
        public IServiceLocationRepository ServiceLocationRepository { get; }
        public IAssignDeliveryAgentRepository AssignDeliveryAgentRepository { get; }
        public void Save();
        public Task<bool> SaveAsync();
    }
}
