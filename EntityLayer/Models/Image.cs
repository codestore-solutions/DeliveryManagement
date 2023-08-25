using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class Image
    {
        public long Id { get; set; }

        [NotMapped]
        public IFormFile File { get; set; } = null!;
        public string? FileName { get; set; } = string.Empty;
        public string FileExtension { get; set; } = null!;
        public string FilePath { get; set; } = null!;
        public long FileSizeInBytes { get; set; }
    }
}
