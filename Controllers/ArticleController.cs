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
        [Route("search")]
        public async Task<IActionResult> Gets(string searchStr, string authorId, string status, int page, int limit)
        {
            return await GetAsync($"/{ApiRouteRsx.Article}/admin/search", new
            {
                searchStr,
                authorId,
                status,
                page,
                limit
            });
        }
        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody] Article model)
        {
            if (model == null) return BadRequest();
            Author author = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);
            model.Author = author;
            return await PostAsync($"/{ApiRouteRsx.Article}/create", null, model);
        }
        [HttpPut]
        [Route("{articleId}")]
        public async Task<IActionResult> EditArticle(string articleId, [FromBody] Article article)
        {
            if (article == null) return BadRequest();
            Author author = AutoMapper.Mapper.Map<Author>(_currentProcess.CurrentAccount.Account);
            article.ModifiedBy = author.Id;
            return await PutAsync($"/{ApiRouteRsx.Article}/{articleId}", null, article);
        }
        [HttpGet]
        [Route("{articleId}")]
        public async Task<IActionResult> Detail(string articleId)
        {
            if (string.IsNullOrWhiteSpace(articleId)) return BadRequest();
            return await GetAsync($"/{ApiRouteRsx.Article}/{articleId}");
        }
        [HttpPut]
        [Route("approve/{articleId}")]
        public async Task<IActionResult> Approve(string articleId)
        {
            return await PutAsync($"/{ApiRouteRsx.Article}/approve/{articleId}");
        }
    }
}