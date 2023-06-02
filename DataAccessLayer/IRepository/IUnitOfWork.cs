
namespace DataAccessLayer.IRepository
{
    public interface IUnitOfWork: IDisposable
    {
        public IImageRepository ImageRepository { get; }
        public IOrderRepository OrderRepository { get; }
        public IBusinessAdminRepository BusinessAdminRepository { get; }
        public IServiceLocationRepository ServiceLocationRepository { get; }
        public IAssignDeliveryAgentRepository OrderAssignRepository { get; }
        public void Save();
        public Task SaveAsync();
    }
}
