using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Models
{
    public class Notification
    {
        public string Id { get; set; }
        public string OwnerActionId { get; set; }//accountId
        public string Content { get; set; }
        public string[] ReceiversId { get; set; }
    }
}
