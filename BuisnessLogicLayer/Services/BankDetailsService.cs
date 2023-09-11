using AutoMapper;
using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgent.Entities.Models;
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

        public async Task<BankDetailResponseDto?> GetAsync(long agentId, bool? masked)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == agentId);

            // If agentId does not exist in db.
            if (agentDetail == null || agentDetail.BankDetails == null)
            {
                return null;
            }

            var bankDetails = agentDetail.BankDetails;
            var response = new BankDetailResponseDto();
            mapper.Map(bankDetails, response);
            // Decrypting sensitive info and sending into mask form in response.
            var decryptedIfsc = AesED.Decrypt(bankDetails.IFSCCode);
            var decryptedAccountNumber = AesED.Decrypt(bankDetails.AccountNumber);
            if (masked == null || masked == true)
            {
                response.IFSCCode = MaskData.SensitiveInfo(decryptedIfsc);
                response.AccountNumber = MaskData.SensitiveInfo(decryptedAccountNumber);
            }
            else
            {
                response.IFSCCode = decryptedIfsc;
                response.AccountNumber = decryptedAccountNumber;
            }
            
            return response;
        }

        public async Task<BankDetail?> AddDetailsAsync(BankDetailsDto bankDetailsDto)
        {
            var agentDetail = await unitOfWork.AgentDetailsRepository.GetAllAsQueryable()
            .FirstOrDefaultAsync(u => u.AgentId == bankDetailsDto.AgentId);

            // Edge Case : Check if bank details already exists or not.
            if (agentDetail != null && agentDetail.BankDetails == null)
            {
                var bankDetails = new BankDetail();
                mapper.Map(bankDetailsDto, bankDetails);
                bankDetails.AgentDetailId = agentDetail.Id;
                // Encrypting sensitive info into cipher text.
                var encryptedIfsc = AesED.Encrypt(bankDetails.IFSCCode);
                var encryptedAccountNumber = AesED.Encrypt(bankDetails.AccountNumber);
                // Adding encrypted info into db.
                bankDetails.IFSCCode = encryptedIfsc;
                bankDetails.AccountNumber = encryptedAccountNumber;
                bankDetails.CreatedOn = bankDetails.UpdatedOn = DateTime.Now;

                await unitOfWork.BankDetailsRepository.AddAsync(bankDetails);
                await unitOfWork.SaveAsync();
                return bankDetails;
            }
            return null;
        }

        public async Task<BankDetail?> UpdateDetailsAsync(long id, BankDetailsDto bankDetailsDto)
        {
            var bankDetails = await unitOfWork.BankDetailsRepository.GetByIdAsync(id);
            if (bankDetails != null)
            {
                mapper.Map(bankDetailsDto, bankDetails);
                // Adding encryped data in db.
                var encryptedIfsc = AesED.Encrypt(bankDetails.IFSCCode);
                var encryptedAccountNumber = AesED.Encrypt(bankDetails.AccountNumber);
                bankDetails.IFSCCode = encryptedIfsc;
                bankDetails.AccountNumber = encryptedAccountNumber;
                bankDetails.UpdatedOn = DateTime.Now;
                await unitOfWork.SaveAsync();
            }
            return bankDetails;
        }

    }
}
