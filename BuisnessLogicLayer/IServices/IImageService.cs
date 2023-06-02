using EntityLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IImageService
    {
       Task Upload(ImageUploadRequestDto requestDto);
    }
}
