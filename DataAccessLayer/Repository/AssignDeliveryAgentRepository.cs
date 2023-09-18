using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class AssignDeliveryAgentRepository : GenericRepository<AssignDeliveryAgent>, IAssignDeliveryAgentRepository
    {
        private readonly DeliveryDbContext dbContext;
        public AssignDeliveryAgentRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}













































//  var listofAgentsWithin10Km = serviceLocation.Where(serviceLocations => CalculateDistance(latitude, longitude, serviceLocations.Latitude, serviceLocations.Longitude) <= maxDistance).ToList();
