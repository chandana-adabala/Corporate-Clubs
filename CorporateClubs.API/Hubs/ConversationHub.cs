using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using CorporateClubs.Services.Services;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;


//namespace BasicChat
//{
//    [Authorize]
//    public class ChatHub : Hub
//    {
//        public void SendChatMessage(string who, string message)
//        {
//            string name = Context.User.Identity.Name;

//            Clients.Group(who).addChatMessage(name + ": " + message);
//        }

//        public override Task OnConnected()
//        {
//            string name = Context.User.Identity.Name;

//            Groups.Add(Context.ConnectionId, name);

//            return base.OnConnected();
//        }
//    }
//}
namespace CorporateClubs.API.Hubs
{
    public class ConversationHub:Hub
    {
        private readonly IConversation _conversationService;
        private IHostingEnvironment _env;
        public ConversationHub(IConversation conversationService, IHostingEnvironment env)
        {
            _conversationService = conversationService;
            _env = env;
        }
        public override async Task OnConnectedAsync()
        {
            //string name = Context.User.Identity.Name;

            //await Groups.AddToGroupAsync(Context.ConnectionId, name);
            await base.OnConnectedAsync();
        }

        public Task SendMessageToUser(int connectedUserID, int userID, string displayName, string profilePic, string message, List<string> files)
        {
            OneToOneConversation chat = new OneToOneConversation()
            {
                ConnectedUserID = connectedUserID,
                UserID = userID,
                Message = message,
                PostedOn = DateTimeOffset.Now,
                RowCreatedOn = DateTime.Now,

            };
            if (files.Count == 0)
            {
                _conversationService.AddMessageToUser(chat);
                Clients.Group(connectedUserID.ToString() +"-"+ userID.ToString()).SendAsync("ReceiveMessageByUser", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
                return Clients.Group(userID.ToString() +"-"+ connectedUserID.ToString()).SendAsync("ReceiveMessageByUser", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
            }
            return Clients.Group(connectedUserID.ToString()).SendAsync("none");
        }

        public Task SendMessageToClub(int clubID, int userID, string displayName, string profilePic, string message, List<string> files)
        {
            Conversation chat = new Conversation()
            {
                ClubID = clubID,
                UserID = userID,
                Message = message,
                PostedOn = DateTimeOffset.Now,
                RowCreatedOn = DateTime.Now,

            };
            if (files.Count == 0)
            {
                _conversationService.AddMessageToClub(chat);
                return Clients.Group("club"+clubID.ToString()).SendAsync("ReceiveMessage", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
            }
            return Clients.Group(clubID.ToString()).SendAsync("none");
        }


        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Caller.SendAsync("Disconnected", exception);
            await base.OnDisconnectedAsync(exception);

        }


    }
}
