using System.Diagnostics.Metrics;

namespace EntityLayer.Common
{
    public static class StringConstant
    {
        public const string InvalidInputError            = "Invalid input. Please provide valid data.";
        public const string ResourceNotFoundError        = "The requested resource was not found in the database.";
        public const string SuccessMessage               = "Successful";
        public const string ErrorMessage                 = "Error";
        public const string NotAvailableMessage          = "Not Available";
        public const string DatabaseMessage              = "Nothing is saved to the database. Please contact to the administrator";
        public const string UpdatedMessage               = "Updated Successfully";
        public const string DeletedMessage               = "Deleted Successfully";
        public const string AddedMessage                 = "Added Successfully";
        public const string AssignedSuccessMessage       = "Assigned Successfully";
        public const string ExistingMessage              = "Details already exists in DB";
        public const string InternalServerErrorMessage   = "Internal Server Error";
        public const string MicroserviceError            = "Microservice is not responding";
        public const string FullNameError                = "Enter Full Name in proper Format";
        public const string InvalidCredentialError       = "Invalid Username or Password";
    }
}
