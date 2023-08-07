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
 
            CreateMap<AssignManuallyDto, AssignDeliveryAgent>().ReverseMap();
            CreateMap<AgentDetailsDto, AgentDetail>().ReverseMap(); 
            CreateMap<BankDetailsDto, BankDetail>().ReverseMap();  
            CreateMap<KYCDto,  KYCDetail>().ReverseMap();  
            CreateMap<VehicleDetailsDto, VehicleDetail>().ReverseMap();    
            CreateMap<AddServiceLocationDto, ServiceLocation>().ReverseMap();
            CreateMap<UpdateWorkingLocationDto , ServiceLocation>().ReverseMap();
            CreateMap<AssignAutomaticObjectDto, AssignDeliveryAgent>().ReverseMap();    
            CreateMap<AssignDeliveryAgent, AssignManuallyObjectDto>().ReverseMap();  
            CreateMap<AgentDetailResponseDto, AgentDetail>().ReverseMap();
            CreateMap<AgentDetail, BankDetail>().ReverseMap();            
        }
    }
}
