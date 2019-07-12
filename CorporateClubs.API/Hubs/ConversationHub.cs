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
            _env = env; ;
        }



        public string FormatFile(IFormFile[] files)
        {
            var webRoot = _env.WebRootPath;

            List<string> urls = new List<string>();

            try
            {


                if (files.Length > 0)
                {
                    foreach (var file in files)
                    {
                        var url = "http://localhost:3333/images";
                        var fileType = '.' + file.ContentType.Split('/')[1];
                        var name = file.FileName;
                        var file1 = System.IO.Path.Combine(webRoot, name);
                        using (var stream = new FileStream(file1, FileMode.Create))
                        {
                            file.CopyToAsync(stream);
                        }
                        urls.Add(url + '/' + name);
                    }

                }



            }
            catch (Exception e)
            {

            }

            return String.Join(",", urls);
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

        public Task SendMessageToClub(int clubID,int userID,string displayName,string profilePic,string message,List<IFormFile> files)
        {
            Conversation chat = new Conversation()
            {
                ClubID = clubID,
                UserID = userID,
                Message = message,
                PostedOn = DateTimeOffset.Now,
                RowCreatedOn  = DateTime.Now,
                //Attachment = FormatFile(files)
            };
            _conversationService.AddMessageToClub(chat);
            return Clients.Group(clubID.ToString()).SendAsync("ReceiveMessage", chat.UserID,displayName,profilePic, chat.Message,chat.PostedOn);
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
