using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Blog.Admin.Infrastructures;
using my8Blog.Admin.Models;

namespace my8Blog.Admin.Controllers
{
    [Route("Articles")]
    public class ArticleController : BaseController
    {
        public ArticleController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
            : base(httpClient, clientConfig, currentProcess)
        {
            //_lastSkip = 0;
        }
        [HttpGet]
        [Route("{searchStr}/{page}/{limit}/{authorId}/{categoryId}")]
        public async Task<IActionResult> Gets(string searchStr, int page, int limit, string authorId, string categoryId)
        {
            return await GetAsync(Request, $"/{ApiRouteRsx.Article}/{searchStr}/{page}/{limit}/{authorId}/{categoryId}");
        }
        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody] Article model)
        {
            if (model == null) return BadRequest();
            Author author = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);
            model.Author = author;
            return await PostAsync(Request, $"/{ApiRouteRsx.Article}/create", null, model);
        }
        [HttpGet]
        [Route("{articleId}")]
        public async Task<IActionResult> Detail(string articleId)
        {
            if (string.IsNullOrWhiteSpace(articleId)) return BadRequest();
            return await GetAsync(Request, $"/{ApiRouteRsx.Article}/{articleId}");
        }
    }
}