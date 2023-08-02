using BusinessLogicLayer.IServices;
using DeliveryAgentModule.CustomActionFilter;
using EntityLayer.Common;
using EntityLayer.Dtos;
using EntityLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryAgentModule.Controllers
{
    [Route("api/v{version:apiVersion}/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService imageService;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ImagesController(IImageService imageService, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            this.imageService = imageService;
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
        }

        // POST: /api/images/upload
        [HttpPost("upload")]
        [ValidateModel]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto requestDto)
        {
            // Validate Extension & Size
            ValidateFileUpload(requestDto);
            if (ModelState.IsValid)
            {
                var imageDomainModel = new Image
                {
                    File = requestDto.File,             
                    FileName = requestDto.FileName,
                    FileSizeInBytes = requestDto.File.Length,
                    FileExtension = Path.GetExtension(requestDto.File.FileName)
                };
                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{ imageDomainModel.FileName}{imageDomainModel.FileExtension}");
                using var stream = new FileStream(localFilePath, FileMode.Create);
                await imageDomainModel.File.CopyToAsync(stream);
                var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}" +
                    $"{httpContextAccessor.HttpContext.Request.PathBase}/Images/{imageDomainModel.FileName}{imageDomainModel.FileExtension}";

                imageDomainModel.FilePath = urlFilePath;
                var result = await imageService.Upload(imageDomainModel);
                return Ok(result);
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
