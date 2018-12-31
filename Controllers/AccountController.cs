using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using my8Blog.Admin.Infrastructures;
using my8Blog.Admin.Models;

namespace my8Blog.Admin.Controllers
{
    [Route("account")]
    public class AccountController : BaseController
    {
        public AccountController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
            : base(httpClient, clientConfig, currentProcess)
        {
        }
        [Route("loginview")]
        public async Task<IActionResult> Login()
        {
            return View();
        }
        [HttpGet]
        [Route("search")]
        [Authorize(Roles ="manager")]
        public async Task<IActionResult> Gets(string searchStr, string role, int page, int limit)
        {
            return await GetAsync($"/{ApiRouteRsx.Account}/search", new
            {
                searchStr,
                page,
                limit,
                role
            });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(AccountLogin model)
        {
            Account account = await LoginUser(model);
            if (!isValidAccount(account)) return View();

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("PersonId", account.PersonId));
            claims.Add(new Claim("Email", account.Email));
            claims.Add(new Claim("ProjectId", account.ProjectId.ToString()));
            if (!string.IsNullOrWhiteSpace(account.DisplayName))
                claims.Add(new Claim("DisplayName", account.DisplayName));
            if (!string.IsNullOrWhiteSpace(account.Avatar))
                claims.Add(new Claim("Avatar", account.Avatar));
            if (!string.IsNullOrWhiteSpace(account.WorkAs))
                claims.Add(new Claim("WorkAs", account.WorkAs));
            if (!string.IsNullOrWhiteSpace(account.Role))
            {
                claims.Add(new Claim(ClaimTypes.Role, account.Role));
            }
            else
            {
                claims.Add(new Claim(ClaimTypes.Role, "guest"));
            }
            if(account.Scopes.Any())
            {
                claims.Add(new Claim("Scopes", String.Join(",", account.Scopes)));
            }
            var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true
            };
            await HttpContext.SignInAsync(principal, authProperties);
            return RedirectToAction("Index", "Home");
        }
        private bool isValidAccount(Account account)
        {
            if (account == null) return false;
            if (string.IsNullOrWhiteSpace(account.PersonId)) return false;
            if (string.IsNullOrWhiteSpace(account.Email)) return false;
            if (string.IsNullOrWhiteSpace(account.ProjectId)) return false;
            return true;
        }
        private async Task<Account> LoginUser(AccountLogin model)
        {
            if (model == null)
            {
                return null;
            }
            if (string.IsNullOrWhiteSpace(model.Password) || string.IsNullOrWhiteSpace(model.Email))
            {
                return null;
            }
            model.Password = Utils.GetSHA256Hash(model.Password);
            var result = await LoginPostAsync("/accounts/login", null, model);
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                if (result.Data != null)
                    return (Account)result.Data.data;
            }
            return null;
        }
        [Route("AccessDenied")]
        public async Task<IActionResult> AccessDenied()
        {
            return StatusCode(403);
        }
    }
}