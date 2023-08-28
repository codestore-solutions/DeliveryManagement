using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;

namespace DataAccessLayer.Repository
{
    public class ImageRepository : GenericRepository<Image>, IImageRepository
    {
        public ImageRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}
