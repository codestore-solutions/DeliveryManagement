﻿using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class WorkingLocationRepository : GenericRepository<WorkingLocation>, IWorkingLocationRepository
    {
        public WorkingLocationRepository(DeliveryDbContext dbContext) : base(dbContext)
        {
        }
    }
}