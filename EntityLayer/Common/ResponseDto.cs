using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Common
{

    public class ErrorResponseDto
    {
        public int StatusCode { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; } = null!;

        public static ErrorResponseDto BuildSuccessResponse(int statusCode, string message, bool success)
        {
            var response = new ErrorResponseDto
            {
                StatusCode = statusCode,
                Message = message,
                Success = success
            };
            return response;
        }
    }
    public class ResponseDto
    {
        public int StatusCode { get; set; }
        public bool Success { get; set; }
        public object Data { get; set; } = null!;
        public string Message { get; set; } = null!;

        public static ResponseDto BuildSuccessResponse(int statusCode,  bool success ,object data, string message)
        {
            var response = new ResponseDto
            {
                StatusCode = statusCode,
                Message = message,
                Data    = data,
                Success = success
            };
            return response;
        }
    }

    

}
