using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;

namespace BuisnessLogicLayer.MiddleWares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly ILogger<ExceptionHandlerMiddleware> logger;
        private readonly RequestDelegate next;

        public ExceptionHandlerMiddleware(ILogger<ExceptionHandlerMiddleware> logger, RequestDelegate next)
        {
            this.logger = logger;
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (Exception ex)
            {
                var errorId = Guid.NewGuid();
                logger.LogError(ex,$"{errorId}: {ex.Message}");

                httpContext.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                httpContext.Response.ContentType="application/json";

                /*var error = new
                {
                    Id = errorId,
                    Message = "Something Went Wrong, We are looking resolving Soon"
                };*/

                string error = errorId + "Something Went Wrong, We are looking resolving Soon";
                await httpContext.Response.WriteAsync(error);
            }
        }



    }
}




















  /*  logger.LogInformation("Logging starts");
              logger.LogWarning("Waring");
              logger.LogError("Error Coming");
             logger.LogError(ex, ex.Message);
  */
            //logger.LogInformation($"Adding data :{JsonSerializer.Serialize(allProductsInsideOrderLine)}");

        