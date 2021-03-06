﻿using Microsoft.AspNetCore.WebUtilities;
using MsgPack.Serialization;
using my8Blog.Admin.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace my8Blog.Admin.Infrastructures
{
    public static class Utils
    {
        public static string GetSHA256Hash(string input)
        {
            if (String.IsNullOrEmpty(input))
                return String.Empty;

            using (var sha = new System.Security.Cryptography.SHA256Managed())
            {
                byte[] textData = System.Text.Encoding.UTF8.GetBytes(input);
                byte[] hash = sha.ComputeHash(textData);
                return BitConverter.ToString(hash).Replace("-", String.Empty);
            }
        }
        public static IEnumerable<KeyValuePair<string, object>> ToKeyPairs(this object obj)
        {
            if (obj == null)
                yield break;

            foreach (var property in obj.GetType().GetProperties())
            {
                var value = property.GetValue(obj);
                if (value != null)
                    yield return new KeyValuePair<string, object>(property.Name, value);
            }
        }
        public static string AddQuery(this string path, object obj)
        {
            if (path == null || obj == null)
                return path;

            return QueryHelpers.AddQueryString(path, obj.ToKeyPairs().ToDictionary(m => m.Key, m => m.Value.ToString()));
        }
        public static string HmacSha256(string originalData, string secretKey)
        {
            var hashed = string.Empty;

            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
                hashed = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalData)));

            return hashed;
        }
        public static byte[] ToBinary(Account account)
        {
            using (var ms = new MemoryStream())
            {
                var packer = SerializationContext.Default.GetSerializer<Account>();
                packer.Pack(ms, account);

                return ms.ToArray();
            }

        }
        public static Account FromBinary(byte[] raw)
        {
            if (raw == null || (!raw.Any()))
                return null;

            using (var ms = new MemoryStream(raw))
            {
                var packer = SerializationContext.Default.GetSerializer<Account>();
                var obj = packer.Unpack(ms);

                return obj;
            }
        }
        public static long GetUnixTime()
        {
            return DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        }

        public static string NonUnicode(this string input,bool trim = true)
        {
            input = input.ToLower().Trim();
            string englishChacs = "abcdefghijklmnopqrstuvwxyz";
            char[] arrInput = input.Distinct().ToArray();
            arrInput = arrInput.Where(p => englishChacs.Contains(p) == false).ToArray();
            string[] arr1 = new string[] { "áàảãạâấầẩẫậăắằẳẵặ","đ","éèẻẽẹêếềểễệ","íìỉĩị","óòỏõọôốồổỗộơớờởỡợ","úùủũụưứừửữự","ýỳỷỹỵ"};
            char[] arr2 = new char[] { 'a','d','e','i','o','u','y'};
            for (int i = 0; i < arrInput.Length; i++)
            {
                for(int j=0;j<arr1.Length;j++)
                {
                    if(arr1[j].IndexOf(arrInput[i])>-1)
                    {
                        input = input.Replace(arrInput[i], arr2[j]);
                        break;
                    }
                }
            }
            if (trim)
                return input.Replace(" ", "");
            return input;
        }
        public static async Task<byte[]> StreamToByArray(Stream input)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                await input.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}
