using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repository
{
    public class OrderAssignRepository : GenericRepository<OrderAssign>, IOrderAssignRepository
    {
        private readonly DeliveryDbContext dbContext;

        public OrderAssignRepository(DeliveryDbContext dbContext): base(dbContext)
        {
            this.dbContext = dbContext;
        }


    }
}













































//  var listofAgentsWithin10Km = serviceLocation.Where(serviceLocations => CalculateDistance(latitude, longitude, serviceLocations.Latitude, serviceLocations.Longitude) <= maxDistance).ToList();
