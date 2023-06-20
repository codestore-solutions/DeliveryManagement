using AutoMapper;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<VerifyAgentRequestDto, BusinessAdmin>().ReverseMap();
            CreateMap<AgentAssignRequestDto, AssignDeliveryAgent>().ReverseMap();
            CreateMap<UpdateAgentRequestDto, AssignDeliveryAgent>().ReverseMap();
            CreateMap<AssignManuallyDto, AssignDeliveryAgent>().ReverseMap();
           
        }
    }
}
