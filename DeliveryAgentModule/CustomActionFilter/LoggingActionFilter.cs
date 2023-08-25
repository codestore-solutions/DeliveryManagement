using Microsoft.AspNetCore.Mvc.Filters;

namespace DeliveryAgent.API.CustomActionFilter
{
    public class LoggingActionFilter : IActionFilter
    {
        private readonly ILogger<LoggingActionFilter> _logger;

        public LoggingActionFilter(ILogger<LoggingActionFilter> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation($"Action '{context.ActionDescriptor.DisplayName}' started.");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation($"Action '{context.ActionDescriptor.DisplayName}' completed.");
        }
    }
}
