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
    public class BankDetailsService : IBankDetailsService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public BankDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ResponseDto?> GetAsync(long agentId)
        {
            var agentDetail = await unitOfWork.BankDetailsRepository.GetAll().FirstOrDefaultAsync(u => u.DeliveryAgentId == agentId);

            if(agentDetail == null)
            {
                return null;
            }
            var response = new ResponseDto();

            if(agentDetail != null)
            {
                response.StatusCode = 200;
                response.Success    = true;
                response.Data       = agentDetail;
                response.Message    = StringConstant.SuccessMessage;
            }
            return response;
        }

        public async Task<ResponseDto?> AddDetailsAsync(BankDetailsDto bankDetailsDto)
        {
            var exitingDetails = await unitOfWork.BankDetailsRepository.GetAll()
            .FirstOrDefaultAsync(u => u.DeliveryAgentId == bankDetailsDto.DeliveryAgentId);

            if (exitingDetails != null)
            {
                return null;
            }
            var bankDetails = new BankDetails();
            mapper.Map(bankDetailsDto, bankDetails);

            await unitOfWork.BankDetailsRepository.AddAsync(bankDetails);
            bool saveResult = await unitOfWork.SaveAsync();          

            return new ResponseDto
            {
                StatusCode      = saveResult ? 200 : 500,
                Success         = saveResult,
                Data            = bankDetails,
                Message         = saveResult ? StringConstant.SuccessMessage : StringConstant.DatabaseMessage
            };
        }

        public async Task<ResponseDto?> UpdateDetailsAsync(long id, BankDetailsDto bankDetailsDto)
        {
            var bankDetails = await unitOfWork.BankDetailsRepository.GetByIdAsync(id);
            if (bankDetails == null)
            {
                return null;
            }
            mapper.Map(bankDetailsDto, bankDetails);
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode      = saveResult ? 200 : 500,
                Success         = saveResult,
                Data            = saveResult ? bankDetails : StringConstant.DatabaseMessage,
                Message         = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

    }
}
