using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Models
{
    public class Account
    {
        public Account() { }
        public string PersonId { get; set; }
        public string DisplayName { get; set; }
        public string ProfileName { get; set; }
        public string Avatar { get; set; }
        public string WorkAs { get; set; }
        public string Company { get; set; }
        public double Rate { get; set; }//Đánh giá 
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int ProjectId { get; set; }
        public string Role { get; set; }
        public string[] Scopes { get; set; }
    }
}
