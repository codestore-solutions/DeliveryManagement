using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Data.Common;

namespace DataAccessLayer.Repository
{
    public class BusinessAdminRepository : GenericRepository<BusinessAdmin>,IBusinessAdminRepository
    {
        private readonly DeliveryDbContext dbContext;
        public BusinessAdminRepository(DeliveryDbContext dbContext):base(dbContext)
        {
            this.dbContext = dbContext;
        }

    
    }
}
