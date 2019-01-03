using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Models
{
    public class Author
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime ModifiedTime { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string ProjectId { get; set; }
    }
}
