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
        public DbSet<BusinessAdmin> BusinessAdmin { get; set; }
        public DbSet<ServiceLocation> ServiceLocations { get; set; }  
        public DbSet<Image> Images { get; set; }    
        public DbSet<Order> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}

