using AutoMapper;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AssignManuallyDto, AssignDeliveryAgent>().ReverseMap();
            CreateMap<AgentDetailsDto, AgentDetail>().ReverseMap();
            CreateMap<BankDetailsDto, BankDetail>().ReverseMap();
            CreateMap<KYCDto, KYCDetail>().ReverseMap();
            CreateMap<VehicleDetailsDto, VehicleDetail>().ReverseMap();
            CreateMap<ServiceLocationDto, ServiceLocation>().ReverseMap();
            CreateMap<UpdateWorkingLocationDto, ServiceLocation>().ReverseMap();
            CreateMap<AssignAutomaticObjectDto, AssignDeliveryAgent>().ReverseMap();
            CreateMap<AssignDeliveryAgent, AssignManuallyObjectDto>().ReverseMap();
            CreateMap<AgentDetailResponseDto, AgentDetail>().ReverseMap();
            CreateMap<AgentDetail, BankDetail>().ReverseMap();
            CreateMap<BankDetail, BankDetailResponseDto>().ReverseMap();
            CreateMap<VehicleDetail, VehicleDetailResponseDto>().ReverseMap();
            CreateMap<AgentDetail , AgentAllDetailsDto>().ReverseMap();
        }
    }
}
