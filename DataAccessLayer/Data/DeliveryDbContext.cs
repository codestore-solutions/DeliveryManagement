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
        public DbSet<DeliveryAgentDetail> DeliveryAgentDetails { get; set; }
        public DbSet<BusinessAdmin> buisnessAdmin { get; set; }
        public DbSet<ServiceLocation> serviceLocations { get; set; }  
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}

