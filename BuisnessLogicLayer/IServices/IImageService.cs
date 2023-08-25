using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.IServices
{
    public interface IImageService
    {
       Task<ResponseDto> Upload(Image image);
    }
}
