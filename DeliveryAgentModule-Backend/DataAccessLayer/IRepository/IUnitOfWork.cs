
namespace DataAccessLayer.IRepository
{
    public interface IUnitOfWork: IDisposable
    {
        public IOrderRepository OrderRepository { get; }
        public IBusinessAdminRepository BusinessAdminRepository { get; }
        public IServiceLocationRepository ServiceLocationRepository { get; }
        public IOrderAssignRepository OrderAssignRepository { get; }
        public void Save();
        public Task SaveAsync();
    }
}
