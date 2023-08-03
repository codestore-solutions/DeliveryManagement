using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            var personalDetail = await unitOfWork.PersonalDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId);
            var kycDetail = personalDetail.KYCs;
            if(kycDetail == null)
            {
                return null;
            }
            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = kycDetail,
                Message    = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto?> AddDetailsAsync(KYCDto kycDto)
        {
            var personalDetails = await unitOfWork.PersonalDetailsRepository.GetAll()
           .FirstOrDefaultAsync(u => u.AgentId == kycDto.AgentId);

            if(personalDetails == null)
            {
                return null;
            }

            var  kycDetails = new KYC();
            mapper.Map(kycDto, kycDetails);
            kycDetails.AgentDetail   = personalDetails;
            kycDetails.AgentDetailId = personalDetails.Id;
            kycDetails.CreatedOn = DateTime.Now;
            kycDetails.UpdatedOn = DateTime.Now;

            await unitOfWork.KYCRepository.AddAsync(kycDetails);  
            bool saveResult = await unitOfWork.SaveAsync();
          
            return new ResponseDto
            {
                StatusCode = 200,
                Success    = true,
                Data       = kycDetails,
                Message    = saveResult ? StringConstant.SuccessMessage : StringConstant.DatabaseMessage
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
                Success    = true,
                Data       = kYCDetails,
                Message    = saveResult ? StringConstant.SuccessMessage : StringConstant.DatabaseMessage
            };
        }
    }
}
