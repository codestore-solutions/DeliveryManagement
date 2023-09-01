﻿using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogicLayer.Services
{
    public class KYCService : IKYCService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public KYCService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto?> GetAsync(long agentId)
        {
            var agent = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if (agent == null)
            {
                return null;
            }
            var kycDetail = agent.KYCs;
            if (kycDetail == null)
            {
                return null;
            }
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = kycDetail,
                Message = StringConstant.SuccessMessage
            };
        }
        public async Task<ResponseDto?> AddDetailsAsync(KYCListDto kycDto)
        {
            foreach (var kycObj in kycDto.List)
            {
                var agentDetails = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
                .FirstOrDefaultAsync(u => u.AgentId == kycObj.AgentId);
                if (agentDetails == null)
                {
                    return null;
                }
                var kycDetails = new KYCDetail();
                mapper.Map(kycObj, kycDetails);
                //kycDetails.AgentDetails = agentDetails;
                kycDetails.AgentDetailId = agentDetails.Id;
                kycDetails.CreatedOn = DateTime.Now;
                kycDetails.UpdatedOn = DateTime.Now;
                await unitOfWork.KYCRepository.AddAsync(kycDetails);
            }

            await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = kycDto.List,
                Message = StringConstant.SuccessMessage
            };
        }
        public async Task<ResponseDto?> UpdateDetailsAsync(long id, KYCDto kYCDto)
        {
            var kYCDetails = await unitOfWork.KYCRepository.GetByIdAsync(id);
            if (kYCDetails == null)
            {
                return null;
            }

            mapper.Map(kYCDto, kYCDetails);
            kYCDetails.UpdatedOn = DateTime.Now;
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = kYCDetails,
                Message = saveResult ? StringConstant.SuccessMessage : StringConstant.DatabaseMessage
            };
        }

    }
}