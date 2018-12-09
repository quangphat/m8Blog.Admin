using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin.Models
{
    public class AccountModel
    {
        public AccountModel(Account account)
        {
            this.Account = account;
        }
        public Account Account { get; set; }
        public string AccountJson
        {
            get
            {
                return PrepareAccountJson(Account);
            }
        }
        private string PrepareAccountJson(Account account)
        {
            if (account == null) return null;
            account.Password = null;
            return JsonConvert.SerializeObject(Account);
        }
    }
}
