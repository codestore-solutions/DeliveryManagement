using AutoMapper;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogicLayer.Mappings
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
           CreateMap<CreateBusinessAdminDto, BusinessAdmin>().ReverseMap();
           CreateMap<OrderAssignRequestDto, OrderAssign>().ReverseMap();
           CreateMap<UpdateOrderAssignDto, OrderAssign>().ReverseMap();
        }
    }
}
