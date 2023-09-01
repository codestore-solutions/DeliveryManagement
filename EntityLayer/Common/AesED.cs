﻿
using Castle.Core.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace DeliveryAgent.Entities.Common
{
    public class AesED
    {
        // Encryption key
        protected readonly static string key = "sfcvixkmffm134eASJDNIfdg";
        
        public static string Encrypt(string text)
        {
            // Initialization vector
            byte[] iv = new byte[16];
            byte[] array;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
                using (MemoryStream ms = new ())
                {
                    using (CryptoStream cryptoStream = new (ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new (cryptoStream))
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
            // iv - Intialization vector.
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(text);
            using (Aes aes = Aes.Create())
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
