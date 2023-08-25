
using System.Security.Cryptography;
using System.Text;

namespace DeliveryAgent.Entities.Models
{
    public class EncryptDecryptManager
    {
        protected readonly static string key = "sfcvixkmffm134eASJDNIfdg";

        public static string Encrypt(string text)
        {
            byte[] iv = new byte[16];
            byte[] array;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
                using(MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using(StreamWriter streamWriter = new StreamWriter(cryptoStream)) 
                        { 
                            streamWriter.Write(text);
                        }
                        array = ms.ToArray();
                    }
                }
            }
            return Convert.ToBase64String(array);
        }

        public static string Decrypt(string text)
        {
            byte[] iv = new byte[16];   
            byte[] buffer = Convert.FromBase64String(text);
            using(Aes  aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                using (MemoryStream ms = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader sr = new StreamReader(cryptoStream))
                        {
                            return sr.ReadToEnd();
                        }
                    }
                };
            }
        }

    }
}
