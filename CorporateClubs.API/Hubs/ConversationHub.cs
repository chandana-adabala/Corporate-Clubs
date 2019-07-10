using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using CorporateClubs.Services.Services;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Services.Models;

namespace CorporateClubs.API.Hubs
{
    public class ConversationHub:Hub
    {
        private readonly IConversation _conversationService;

        public ConversationHub(IConversation conversationService)
        {
            _conversationService = conversationService;
        }

        public Task SendMessageToAll(int clubID, int userID, string message)
        {
            Conversation chat = new Conversation()
            {
                ClubID = clubID,
                UserID = userID,
                Message = message,
                PostedOn = DateTimeOffset.Now,
                RowCreatedOn = DateTime.Now
            };
            _conversationService.AddMessageToClub(chat);
            return  Clients.All.SendAsync("ReceiveMessage", chat.UserID, chat.Message, chat.PostedOn);
        }

        public Task SendMessageToClub(int clubID,int userID,string message)
        {
            Conversation chat = new Conversation()
            {
                ClubID = clubID,
                UserID = userID,
                Message = message,
                PostedOn = DateTimeOffset.Now,
                RowCreatedOn  = DateTime.Now
            };
            _conversationService.AddMessageToClub(chat);
            return Clients.Group(clubID.ToString()).SendAsync("ReceiveMessage", chat.UserID, chat.Message,chat.PostedOn);
        }
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Caller.SendAsync("Disconnected", exception);
            await base.OnDisconnectedAsync(exception);

        }


    }
}
