using AutoMapper;
using my8Blog.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Infrastructures
{
    public class CurrentProcess
    {
        public AccountModel CurrentAccount { get; set; }
    }
    public class AppConfig
    {
        public string ClientId { get; set; }
        public string Authority { get; set; }
    }
}
