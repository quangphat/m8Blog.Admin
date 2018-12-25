using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using my8Blog.Admin.Infrastructures;
using my8Blog.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Blog.Admin
{
    public class NotificationHub : Hub
    {
        protected SignalRAccount _currentAccount;
        protected static List<SignalRAccount> _ConnectingAccounts = new List<SignalRAccount>();
        public void Notify(Notification notify)
        {
            if (notify == null) return;
            IReadOnlyList<string> receiverIds = GetConnectionIdsFromPersonIds(notify.ReceiversId);
            if (receiverIds == null) return;
            Clients.Clients(receiverIds).SendAsync("Notify", notify);
            string id = Context.ConnectionId;
            string names = Context.User.Identity.Name;

            //Clients.Group(names).InvokeAsync("dd",names, message);
        }
        public override async Task OnConnectedAsync()
        {
            _currentAccount = getAccount(Context);
            SignalRAccount exists = _ConnectingAccounts.Where(p => p.PersonId == _currentAccount.PersonId).FirstOrDefault();
                if (exists == null)
                    _ConnectingAccounts.Add(_currentAccount);

            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _currentAccount = getAccount(Context);
            SignalRAccount exists = _ConnectingAccounts.Where(p => p.PersonId == _currentAccount.PersonId).FirstOrDefault();
            if (exists != null)
                _ConnectingAccounts.Remove(exists);
            await base.OnDisconnectedAsync(exception);
        }
        private IReadOnlyList<string> GetConnectionIdsFromPersonIds(string[] personIds)
        {
            List<string> Ids = new List<string>();
            for (int i = 0; i < personIds.Length; i++)
            {
                SignalRAccount signalRAccount = _ConnectingAccounts.Where(p => p.PersonId == personIds[i]).FirstOrDefault();
                if (signalRAccount != null)
                {
                    Ids.Add(signalRAccount.ConnectionId);
                }
            }
            return Ids;
        }
        private SignalRAccount getAccount(HubCallerContext context)
        {
            string personId = string.Empty;
            personId = context.GetHttpContext().Request.Query["personId"].ToString();
            SignalRAccount account = new SignalRAccount()
            {
                PersonId = personId,
                ConnectionId = context.ConnectionId
            };
            return account;
        }
    }

}
