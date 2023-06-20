using Microsoft.EntityFrameworkCore;
using EntityLayer.Models;

namespace DataAccessLayer.Data
{
    public class DeliveryDbContext: DbContext
    {
        public DeliveryDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<AssignDeliveryAgent> AssignDeliveryAgents { get; set; }
        public DbSet<DeliveryAgent> deliveryAgents { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<BusinessAdmin> buisnessAdmin { get; set; }
        public DbSet<ServiceLocation> serviceLocations { get; set; }
        public DbSet<Order> orders { get; set; }   
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

         
            var addServiceLocations = new List<ServiceLocation>
            {
                new ServiceLocation
                {
                    Id = 1,
                    DeliveryAgentId=1,
                    Latitude=29.4165905,
                    Longitude=76.6681525,
                    MaxDistance=10
                },
                 new ServiceLocation
                {
                     Id = 2,
                    DeliveryAgentId=2,
                    Latitude=29.4295905,
                    Longitude=76.9981525,
                    MaxDistance=10,
                },
                new ServiceLocation
                {
                    Id = 3,
                    DeliveryAgentId=3,
                    Latitude=29.4065905,
                    Longitude=76.2681525,
                    MaxDistance=10
                },

            };

           
        }

    }
}

