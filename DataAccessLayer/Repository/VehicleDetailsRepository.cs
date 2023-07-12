using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class VehicleDetailsRepository : GenericRepository<VehicleDetails>, IVehicleDetailsRepository
    {
        public VehicleDetailsRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}
