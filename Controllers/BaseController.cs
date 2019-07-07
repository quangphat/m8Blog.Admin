using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Blog.Admin.Infrastructures;
using my8Blog.Admin.Models;

namespace my8Blog.Admin.Controllers
{
    public class BaseController : Controller
    {
        protected readonly HttpClient _httpClient;
        protected readonly ClientConfig _clientConfig;
        protected readonly CurrentProcess _currentProcess;
        private const string SESSION_KEY = "current-user";
        public BaseController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
            _currentProcess = currentProcess;
        }
        protected async Task<IActionResult> GetAsync(string path = "/", object param = null)
        {
            return await _httpClient.Get(_clientConfig, path, param, _currentProcess);
        }
        protected async Task<IActionResult> DeleteAsync(string path = "/", object data = null)
        {
            return await _httpClient.Delete(_clientConfig, path, data, _currentProcess);
        }

        protected async Task<IActionResult> PostAsync(string path = "/", object param = null, object data = null)
        {
            return await _httpClient.Post(_clientConfig, path, param, data, _currentProcess);
        }

        protected async Task<IActionResult> PutAsync(string path = "/", object param = null, object data = null)
        {
            return await _httpClient.Put(_clientConfig, path, param, data, _currentProcess);
        }
        protected async Task<HttpClientResult<ResponseJsonModel<Account>>> LoginPostAsync(string path = "/",
            object param = null, object data = null)
        {
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Account>>(_clientConfig, HttpMethod.Post, path, param, data, _currentProcess);
            return result;
        }
        protected async void SetNewCookie(Account account)
        {
            var raw = Utils.ToBinary(account);
            var identity = new ClaimsIdentity(User.Identity);
            var avatarClaim = identity.FindFirst("Avatar");
            if (avatarClaim != null)
                identity.RemoveClaim(identity.FindFirst("Avatar"));
            if (!string.IsNullOrWhiteSpace(account.Avatar))
                identity.AddClaim(new Claim("Avatar", account.Avatar));
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true
            };
            await HttpContext.SignInAsync(principal, authProperties);
            HttpContext.Session.Set("current-user", raw);
        }
    }
}