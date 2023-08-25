using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using static EntityLayer.Models.BusinessAdmin;

namespace BusinessLogicLayer.Services
{
    public class BusinessAdminService : IBusinessAdminService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public BusinessAdminService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
       
      
    }
}
