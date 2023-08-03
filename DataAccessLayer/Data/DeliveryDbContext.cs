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
        public DbSet<AgentDetail> AgentDetails { get; set; }
        public DbSet<KYC> kYCs { get; set; }
        public DbSet<BankDetails> BankDetails { get; set; }
        public DbSet<VehicleDetails> VechicleDetails { get; set; }
        public DbSet<BusinessAdmin> BusinessAdmin { get; set; }
        public DbSet<ServiceLocation> ServiceLocations { get; set; }  
        public DbSet<Image> Images { get; set; }    
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder
           .UseLazyLoadingProxies()
           .UseSqlServer("name=ConnectionStrings:DeliveryAgentConnectionString");
        }

    }
}

