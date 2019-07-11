using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Infrastructures
{
    public static class FileHelper
    {
        public static string GetFileName(string accountId)
        {
            return $"{accountId}{Guid.NewGuid()}_avatar";
        }
        
        public static async Task<byte[]> IFormFileToByteArray(IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                return await StreamToByteArray(stream);
            }
        }
        public static async Task<byte[]> StreamToByteArray(Stream input)
        {
            using (var ms = new MemoryStream())
            {
                await input.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
        //public static async Task<IDictionary<string, object>> UploadFileHelper(this IFormFile file)
        //{
        //    var x = new Dictionary<string, object>() {
        //        {file.FileName, await IFormFileToByteArray(file)}
        //    };
        //    return x;
        //}
        public static async Task<List<Tuple<string, object>>> UploadFileHelper(this IFormFile file)
        {
            return new List<Tuple<string, object>>
            {
                new Tuple<string, object>(file.FileName, await IFormFileToByteArray(file))
            };
        }
    }
}
