using BusinessLogicLayer.IServices;
using EntityLayer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService imageService;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ImagesController(IImageService imageService, IWebHostEnvironment webHostEnvironment)
        {
            this.imageService = imageService;
            this.webHostEnvironment = webHostEnvironment;
        }

        // POST: /api/images/upload
        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto requestDto)
        {
            // Validate Extension & Size
            ValidateFileUpload(requestDto);
            //var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath,"Images",)
            if(ModelState.IsValid)
            {
                await imageService.Upload(requestDto);
            }
            return BadRequest(ModelState);
        }

        private void ValidateFileUpload(ImageUploadRequestDto requestDto)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };
            if (!allowedExtensions.Contains(Path.GetExtension(requestDto.File.FileName)))
            {
                ModelState.AddModelError("file", "UnSupported File Extenstion");
            }
            if(requestDto.File.Length> 2000000)
            {
                ModelState.AddModelError("file", "file size more than 2 MB, please upload a smaller file");
            }
        }
    }
}
