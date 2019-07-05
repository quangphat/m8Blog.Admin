using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Blog.Admin.Infrastructures;
using my8Blog.Admin.Models;

namespace my8Blog.Admin.Controllers
{
    [Route("media")]
    public class MediaController : BaseController
    {
        private readonly IHostingEnvironment _appEnvironment;
        public MediaController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess, IHostingEnvironment appEnvironment)
            : base(httpClient, clientConfig, currentProcess)
        {
            _appEnvironment = appEnvironment;
        }
        [HttpPost]
        [Route("{accountId}/avatar")]
        public async Task<IActionResult> UploadAvatar(string accountId, IFormFile file)
        {

            if (file == null)
                return BadRequest("Dữ liệu không hợp lệ");
            var uploads = Path.Combine(_appEnvironment.WebRootPath, "upload\\images");
            string fileName = await FileHelper.UploadAvatar(file, accountId, uploads);
            if (!string.IsNullOrWhiteSpace(fileName))
            {
                var account = _currentProcess.CurrentAccount.Account;
                account.Avatar = fileName;
                SetNewCookie(account);
                if (file == null)
                    return BadRequest("Dữ liệu không hợp lệ");

                var data = await file.UploadFileHelper();
                return await PostAsync($"/{ApiRouteRsx.Media}/{accountId}/avatar/{fileName}", null, data);
            }
            return BadRequest();
        }
    }
}