/*using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Data
{
    public class DeliveryAuthDbContext : IdentityDbContext
    {
        public DeliveryAuthDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var userId = "1234";
            var adminId = "7890";

            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = userId,
                    ConcurrencyStamp=userId,
                    Name= "User",
                    NormalizedName= "User".ToUpper(),
                },
                new IdentityRole()
                {
                    Id = adminId,
                    ConcurrencyStamp=adminId,
                    Name= "Admin",
                    NormalizedName= "Admin".ToUpper(),
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
*/