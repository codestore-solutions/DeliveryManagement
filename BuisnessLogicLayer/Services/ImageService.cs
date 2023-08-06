using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks; 

namespace BusinessLogicLayer.Services
{
    public class ImageService: IImageService
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
                Success    = true,
                Data       = image,
                Message    = StringConstant.AddedMessage
            };
        }

       
    }
}
