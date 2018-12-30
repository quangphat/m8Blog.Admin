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
        public static async Task<string> UploadAvatar(IFormFile file, string accountId, string path)
        {
            if (file == null || string.IsNullOrWhiteSpace(accountId)) return string.Empty;
            if (file.Length > 0)
            {
                var fileName = $"{accountId}{Guid.NewGuid()}_avatar";
                string fullName = $"{fileName}.png";
                using (var fileStream = new FileStream(Path.Combine(path, fullName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    return fileName;
                }

            }
            return string.Empty;
        }
    }
}
