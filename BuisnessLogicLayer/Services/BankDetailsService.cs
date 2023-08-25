using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Models;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<BankDetailResponseDto?> GetAsync(long agentId)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == agentId);

            if (agentDetail == null || agentDetail.BankDetails == null)
            {
                return null;
            }
            var bankDetails = agentDetail.BankDetails;
            var response = new BankDetailResponseDto();
            mapper.Map(bankDetails, response);
            var decryptedIfsc = EncryptDecryptManager.Decrypt(bankDetails.IFSCCode);
            var decryptedAccountNumber = EncryptDecryptManager.Decrypt(bankDetails.AccountNumber);
            response.IFSCCode = CommonFunctions.MaskData(decryptedIfsc);
            response.AccountNumber = CommonFunctions.MaskData(decryptedAccountNumber);
            return response;
        }

        public async Task<ResponseDto?> AddDetailsAsync(BankDetailsDto bankDetailsDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == bankDetailsDto.AgentId);
            if(agentDetail== null)
            {
                return null;
            }
            var existingDetails = agentDetail.BankDetails;

            if (existingDetails != null)
            {
                return null;
            }
            var bankDetails = new BankDetail();
            mapper.Map(bankDetailsDto, bankDetails);
            bankDetails.AgentDetailId = agentDetail.Id;
            var encryptedIfsc = EncryptDecryptManager.Encrypt(bankDetails.IFSCCode);
            var encryptedAccountNumber = EncryptDecryptManager.Encrypt(bankDetails.AccountNumber);
            bankDetails.IFSCCode = encryptedIfsc;
            bankDetails.AccountNumber = encryptedAccountNumber;
            bankDetails.CreatedOn = DateTime.Now;
            bankDetails.UpdatedOn = DateTime.Now;

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
            var encryptedIfsc = EncryptDecryptManager.Encrypt(bankDetails.IFSCCode);
            var encryptedAccountNumber = EncryptDecryptManager.Encrypt(bankDetails.AccountNumber);
            bankDetails.IFSCCode = encryptedIfsc;
            bankDetails.AccountNumber = encryptedAccountNumber;
            bankDetails.UpdatedOn = DateTime.Now;
            bool saveResult = await unitOfWork.SaveAsync();

            return new ResponseDto
            {
                StatusCode      = saveResult ? 200 : 500,
                Success         = saveResult,
                Data            = bankDetails,
                Message         = saveResult ? StringConstant.UpdatedMessage : StringConstant.DatabaseMessage
            };
        }

    }
}
