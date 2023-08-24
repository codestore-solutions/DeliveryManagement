namespace DeliveryAgent.Entities.Common
{
    public static class CommonFunctions
    {
        public static string MaskData(string text)
        {
            if (string.IsNullOrEmpty(text) && text.Length <=4)
                return text;

            int maskedLength = text.Length - 4;
            string maskedPart = new string('x', maskedLength);
            string lastDigits = text.Substring(maskedLength);
            return maskedPart + lastDigits;
        }
    }
}
