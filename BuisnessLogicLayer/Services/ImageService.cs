using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.Services
{
    public class ImageService : IImageService
    {
        private readonly IUnitOfWork unitOfWork;

        public ImageService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<ResponseDto> Upload(Image image)
        {
            // Create Domain Model
            await unitOfWork.ImageRepository.AddAsync(image);
            await unitOfWork.SaveAsync();
            return new ResponseDto
            {
                StatusCode = 200,
                Success = true,
                Data = image,
                Message = StringConstant.AddedMessage
            };
        }


    }
}
