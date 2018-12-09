using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public BaseController(HttpClient httpClient, IOptions<ClientConfig> clientConfig,CurrentProcess currentProcess)
        {
            _httpClient = httpClient;
            _clientConfig = clientConfig.Value;
            _currentProcess = currentProcess;
        }
        protected async Task<IActionResult> GetAsync(HttpRequest request, string path = "/", object param = null)
        {
            return await _httpClient.Get(_clientConfig, request, path, param,_currentProcess);
        }
        protected async Task<IActionResult> DeleteAsync(HttpRequest request, string path = "/", object data = null)
        {
            return await _httpClient.Delete(_clientConfig, request, path, data, _currentProcess);
        }

        protected async Task<IActionResult> PostAsync(HttpRequest request, string path = "/", object param = null, object data = null)
        {
            return await _httpClient.Post(_clientConfig, request, path, param, data, _currentProcess);
        }

        protected async Task<IActionResult> PutAsync(HttpRequest request, string path = "/", object param = null, object data = null)
        {
            return await _httpClient.Put(_clientConfig, request, path, param, data, _currentProcess);
        }
        protected async Task<HttpClientResult<ResponseJsonModel<Account>>> LoginPostAsync(HttpRequest request, string path = "/", 
            object param = null, object data = null)
        {
            var result = await _httpClient.SendRequestAsync<ResponseJsonModel<Account>>(_clientConfig, request, path, param, data, _currentProcess);
            return result;
        }
    }
}