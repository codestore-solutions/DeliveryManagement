using BusinessLogicLayer.IServices;
using DeliveryAgent.Entities.Common;
using DeliveryAgent.Entities.Dtos;
using DeliveryAgentModule.CustomActionFilter;
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
        // [Authorize(Roles = "5")]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto requestDto)
        {
            // Validate Extension & Size
            ValidateFileUpload(requestDto);
            if (ModelState.IsValid)
            {
                var fileName = requestDto.File.FileName;
                //var fileExtension = Path.GetExtension(requestDto.File.FileName);
                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{fileName}");
                using var stream = new FileStream(localFilePath, FileMode.Create);
                await requestDto.File.CopyToAsync(stream);
                var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}" +
                    $"{httpContextAccessor.HttpContext.Request.PathBase}/Images/{fileName}";

                return Ok(new ResponseDto { StatusCode = 200, Success = true, Data = new { urlFilePath = urlFilePath }, Message = StringConstant.SuccessMessage });
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
            if (requestDto.File.Length > 2000000)
            {
                ModelState.AddModelError("file", "file size more than 2 MB, please upload a smaller file");
            }
        }

    }
}
