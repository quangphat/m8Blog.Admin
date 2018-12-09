using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using my8Blog.Admin.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Principal;
using System.Security.Claims;

namespace my8Blog.Admin.Infrastructures
{
    public static class WebExtensions
    {
        public static void Addmy8Authentication(this IServiceCollection services, IConfiguration configuration, string applicationName, string cookieName = "my8ProgramingBlog")
        {

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            //DataProtectionBuilderExtensions.PersistKeysToFileSystem(DataProtectionBuilderExtensions.SetDefaultKeyLifetime(DataProtectionBuilderExtensions.SetApplicationName(DataProtectionServiceCollectionExtensions.AddDataProtection(services), applicationName), TimeSpan.FromDays(36500.0)), new DirectoryInfo("/keys"));
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(option => {
                   
                    option.ExpireTimeSpan = TimeSpan.FromDays(30);
                    option.SlidingExpiration = true;
                    option.Cookie.Name = "my8ProgramingBlog";
                    option.LoginPath = "/Account/Login";
                });
        }
        public static Account GetUserInfo(this HttpContext context)
        {
            IIdentity identity = (context != null) ? context.User?.Identity : null;
            if (identity != null && identity.IsAuthenticated)
            {
                List<Claim> list = context.User.Claims?.ToList();
                if (list != null && list.Count != 0)
                {
                    string id = string.Empty;
                    string orgId = string.Empty;
                    Account account = new Account();
                    account.PersonId = id;
                    Claim claim = list.FirstOrDefault(p => p.Type == "Email");
                    account.Email = claim.Value;
                    account.DisplayName = list.FirstOrDefault((Claim a) => a.Type == "DisplayName")?.Value;
                    account.ProfileName = list.FirstOrDefault((Claim a) => a.Type == "Url")?.Value;
                    account.PersonId = list.FirstOrDefault((Claim a) => a.Type == "PersonId")?.Value;
                    account.WorkAs = list.FirstOrDefault((Claim a) => a.Type == "WorkAs")?.Value;
                    account.Role = list.FirstOrDefault((Claim a) => a.Type == "Role")?.Value;
                    string scopeStr = list.FirstOrDefault((Claim a) => a.Type == "Scopes")?.Value;
                    if(!string.IsNullOrWhiteSpace(scopeStr))
                    {
                        account.Scopes = scopeStr.Split(',');
                    }
                    string projectIdStr = list.FirstOrDefault((Claim a) => a.Type == "ProjectId")?.Value;
                    if (!string.IsNullOrWhiteSpace(projectIdStr))
                    {
                        account.ProjectId = Convert.ToInt32(projectIdStr);
                    }
                    return account;
                }
                return null;
            }
            return null;
        }
    }
}
