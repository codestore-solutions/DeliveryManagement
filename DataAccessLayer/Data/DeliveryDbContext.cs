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
        public DbSet<KYCDetail> KYCDetails { get; set; }
        public DbSet<BankDetail> BankDetails { get; set; }
        public DbSet<VehicleDetail> VehicleDetails { get; set; }
        public DbSet<BusinessAdmin> BusinessAdmins { get; set; }
        public DbSet<ServiceLocation> ServiceLocations { get; set; }    
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

