
namespace DataAccessLayer.IRepository
{
    public interface IUnitOfWork: IDisposable
    {
        public IWorkingLocationRepository WorkingLocationRepository { get; }
        public IAgentDetailsRepository AgentDetailsRepository { get; }
        public IImageRepository ImageRepository { get; }
        public IBusinessAdminRepository BusinessAdminRepository { get; }
        public IServiceLocationRepository ServiceLocationRepository { get; }
        public IAssignDeliveryAgentRepository AssignDeliveryAgentRepository { get; }
        public void Save();
        public Task<bool> SaveAsync();
    }
}
