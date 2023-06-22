using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Dtos
{
    public class ImageUploadRequestDto
    {
        [Required]
        public IFormFile File { get; set; } = null!;

        [Required] public string FileName { get; set; } = null!;
        public string? FileDescription { get; set; }
    }
}
