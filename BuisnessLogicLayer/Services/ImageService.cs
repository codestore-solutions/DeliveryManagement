using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
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

        public async Task Upload(ImageUploadRequestDto requestDto)
        {
            // Create Domain Model
            var imageDomainModel = new Image
            {
                File = requestDto.File,
                FileDescription = requestDto.FileDescription,
                FileName = requestDto.FileName,
                FileSizeInBytes = requestDto.File.Length,
                FileExtension = Path.GetExtension(requestDto.FileName)
            };


        }

       
    }
}
