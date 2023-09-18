using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.IServices
{
    public interface IImageService
    {
        Task<ResponseDto> Upload(Image image);
    }
}
