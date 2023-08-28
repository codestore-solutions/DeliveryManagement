using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeliveryAgent.Entities.Common
{

    public class ErrorResponseDto : ResponseDto
    {

    }
    public class ResponseDto
    {
        public int StatusCode { get; set; }
        public bool Success { get; set; }
        public object? Data { get; set; }
        public string Message { get; set; } = null!;
    }



}
