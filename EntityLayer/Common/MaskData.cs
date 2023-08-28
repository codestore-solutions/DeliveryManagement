namespace DeliveryAgent.Entities.Common
{
    public static class MaskData
    {
        private const int charCount = 4;
        public static string SensitiveInfo(string text)
        {
            // Covering edge case : As for current implementation string having more than 4 characters.
            if (string.IsNullOrEmpty(text) && text.Length <= charCount)
                return text;

            int maskedLength = text.Length - charCount;
            string maskedPart = new string('x', maskedLength);
            string lastDigits = text.Substring(maskedLength);
            return maskedPart + lastDigits;
        }
    }
}
