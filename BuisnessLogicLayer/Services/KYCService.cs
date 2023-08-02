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
            var kYCDetail = await unitOfWork.KYCRepository.GetAll().FirstOrDefaultAsync(u => u.AgentId == agentId);
            if(kYCDetail == null)
            {
                return null;
            }
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = kYCDetail,
                Message = StringConstant.SuccessMessage
            };
        }

        public async Task<ResponseDto> AddDetailsAsync(KYCDto kycDto)
        {
           
            var  kycDetails = new KYC();
            mapper.Map(kycDto, kycDetails);
            await unitOfWork.KYCRepository.AddAsync(kycDetails);
            bool saveResult = await unitOfWork.SaveAsync();
          

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success = saveResult,
                Data = kycDetails,
                Message = saveResult ? StringConstant.SuccessMessage : StringConstant.ErrorMessage
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
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode = saveResult ? 200 : 500,
                Success = saveResult,
                Data = saveResult ? kYCDetails : StringConstant.DatabaseMessage,
                Message = saveResult ? StringConstant.SuccessMessage : StringConstant.DatabaseMessage
            };
        }
    }
}
