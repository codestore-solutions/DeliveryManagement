using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class VehicleDetailsRepository : GenericRepository<VehicleDetail>, IVehicleDetailsRepository
    {
        public VehicleDetailsRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}
