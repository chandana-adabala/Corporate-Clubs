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



      

        public Task SendMessageToAll(int clubID, int userID, string message,List<string> files)
        {
            Conversation chat = new Conversation()
            {
                ClubID = clubID,
                UserID = userID,
                Message = message,
                PostedOn = DateTimeOffset.Now,
                RowCreatedOn = DateTime.Now
              
            };
            if(files.Count > 0)
            {
                return Clients.All.SendAsync("ReceiveMessage", chat.UserID, chat.Message, chat.PostedOn,files);
            }
            _conversationService.AddMessageToClub(chat);
            return Clients.All.SendAsync("ReceiveMessage", chat.UserID, chat.Message, chat.PostedOn);
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
                return Clients.Group(clubID.ToString()).SendAsync("ReceiveMessage", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
            }
            return Clients.Group(clubID.ToString()).SendAsync("none");
        }

        //public Task SendMessageToClubWithAttach(int clubID, int userID, string displayName, string profilePic, string message, string[] attachMentUrls,string[] attachmentNames)
        //{
            
        //    return Clients.Group(clubID.ToString()).SendAsync("ReceiveMessage", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
        //}
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
