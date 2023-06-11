using Microsoft.EntityFrameworkCore;
using EntityLayer.Models;

namespace DataAccessLayer.Data
{
    public class DeliveryDbContext: DbContext
    {
        public DeliveryDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {

        }
        public DbSet<AgentAssociation> AgentAssociations { get; set; }
        public DbSet<AssignDeliveryAgent> orderAssigns { get; set; }
        public DbSet<DeliveryAgent> deliveryAgents { get; set; }
        public DbSet<BusinessAdmin> buisnessAdmin { get; set; }
        public DbSet<ServiceLocation> serviceLocations { get; set; }
        public DbSet<Order> orders { get; set; }   
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var addingorders = new List<Order>()
            {
                new Order
                {
                    Id=21,
                    OrderAmount=2799,
                    paymentType=(Order.PaymentType)2,
                    ShippingAddress="Noida Sector 59"      
                },
                new Order
                {
                    Id=22,
                    OrderAmount=9799,
                    paymentType=(Order.PaymentType)1,
                    ShippingAddress="Noida Sector 6"
                },
                new Order
                {
                    Id=23,
                    OrderAmount=18799,
                    paymentType=(Order.PaymentType)2,
                    ShippingAddress="Noida Electronic City"
                },
                new Order
                {
                    Id=24,
                    OrderAmount=799,
                    paymentType=(Order.PaymentType)1,
                    ShippingAddress="Dwarka Sector 21"
                },
                new Order
                {
                    Id=25,
                    OrderAmount=18299,
                    paymentType=(Order.PaymentType)2,
                    ShippingAddress="Malviya Nagar Delhi"
                },
                new Order
                {
                    Id=26,
                    OrderAmount=24799,
                    paymentType=(Order.PaymentType)2,
                    ShippingAddress="Noida Sector 62"
                },

            };
            
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

            modelBuilder.Entity<Order>().HasData(addingorders);
           
        }

    }
}

