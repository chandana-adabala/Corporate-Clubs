using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CorporateClubs.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Models.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using CorporateClubs.API.Hubs;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;


namespace CorporateClubs.API.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    [EnableCors("allowmyorgin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private readonly IConversation _conversation;
        private readonly IConversation _conversationService;
        private readonly IClubs _clubs;
        private readonly IUsers _users;
        private IHostingEnvironment _env;
        private readonly IHubContext<ConversationHub> _hubContext;
        public ConversationsController(IHubContext<ConversationHub> hubContext,IConversation conversationService, IClubs clubs, IUsers users, IConversation conversation, IHostingEnvironment env)
        {
            _clubs = clubs;
            _conversationService = conversationService;
            _users = users;
            _conversation = conversation;
            _env = env;
            _hubContext = hubContext;
        }

        [HttpGet]
        [Route("getallmessagesofclub/{clubID:int}")]
        public ActionResult<List<MessageSenderInfo>> GetAllMessagesOfClub(int clubID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    
                    return _conversation.GetAllMessagesOfClub(clubID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallmessagesofuser/{connectedUserID:int}")]
        public ActionResult<List<OneToOneMessages>> GetAllMessagesOfUser(int connectedUserID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)

                    return _conversation.GetAllMessagesOfUser(connectedUserID, requestedUser.UserID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Route("uploadattachments/{userID:int}/{clubID:int}")]
        public async Task<string> UploadAttachments([FromForm] IFormFileCollection files, int userID, int clubID)
        {
            var webroot = _env.WebRootPath;
            try
            {
                if(true)
                {
                    string msgInfo;
                    using (var reader = new StreamReader(files[0].OpenReadStream()))
                    {
                        msgInfo = reader.ReadToEnd();
                    }
                    JObject msg = JObject.Parse(msgInfo);
                    MessageSenderInfo messageSenderInfo = msg.ToObject<MessageSenderInfo>();
                    Conversation chat = msg.ToObject<Conversation>();
                    chat.PostedOn = DateTimeOffset.Now;
                    chat.RowCreatedOn = DateTime.Now;
                   
                    string url = "http://localhost:3333/root/files/";
                    
                    for (int i=1;i<files.Count();i++)
                    {
                        
                        string fileType = '.' + files[i].ContentType.Split('/')[1];
                        string name = i+"-"+clubID + "-" + userID + "-" + chat.PostedOn.ToString("yyyy-MM-ddTHH-mm-ss") + fileType;
                        var filepath = System.IO.Path.Combine(webroot+"//files", name);
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            await files[i].CopyToAsync(stream);
                        }
                        chat.AttachmentUrls +=  url + '/' + name+" ";
                        chat.AttachmentNames += files[i].FileName + "/";
                    }
                    chat.AttachmentUrls = chat.AttachmentUrls.Substring(0,(chat.AttachmentUrls.Count() - 1));
                    chat.AttachmentNames = chat.AttachmentNames.Substring(0, (chat.AttachmentNames.Count() - 1));
                    _conversationService.AddMessageToClub(chat);

                    string[] urls;
                    string[] names;
                    urls =chat.AttachmentUrls.Split(" ");
                    names =chat.AttachmentNames.Split("/");
                    await _hubContext.Clients.Group("club"+clubID.ToString()).SendAsync("ReceiveMessage", userID, messageSenderInfo.userName, messageSenderInfo.profilePic, chat.Message, chat.PostedOn, urls, names);

                }
                

            }
            catch(Exception e)
            {
                return $"Error:{e.Message}";
            }
            return "Files uploaded";
        }


        [HttpPost]
        [Route("uploadattachmentstochat/{connectedUserID:int}/{userID:int}")]
        public async Task<string> UploadAttachmentsToThread([FromForm] IFormFileCollection files, int connectedUserID, int userID)
        {
            var webroot = _env.WebRootPath;
            try
            {
                if (true)
                {
                    string msgInfo;
                    using (var reader = new StreamReader(files[0].OpenReadStream()))
                    {
                        msgInfo = reader.ReadToEnd();
                    }
                    JObject msg = JObject.Parse(msgInfo);
                    OneToOneMessages messageSenderInfo = msg.ToObject<OneToOneMessages>();
                    OneToOneConversation chat = msg.ToObject<OneToOneConversation>();
                    chat.PostedOn = DateTimeOffset.Now;
                    chat.RowCreatedOn = DateTime.Now;

                    string url = "http://localhost:3333/root/files/";

                    for (int i = 1; i < files.Count(); i++)
                    {
                        string fileType = '.' + files[i].ContentType.Split('/')[1];
                        string name = i + "-" + connectedUserID + "-" + userID + "-" + chat.PostedOn.ToString("yyyy-MM-ddTHH-mm-ss") + fileType;
                        var filepath = System.IO.Path.Combine(webroot + "//files", name);
                        using (var stream = new FileStream(filepath, FileMode.Create))
                        {
                            await files[i].CopyToAsync(stream);
                        }
                        chat.AttachmentUrls += url + '/' + name + " ";
                        chat.AttachmentNames += files[i].FileName + "/";
                    }
                    chat.AttachmentUrls = chat.AttachmentUrls.Substring(0, (chat.AttachmentUrls.Count() - 1));
                    chat.AttachmentNames = chat.AttachmentNames.Substring(0, (chat.AttachmentNames.Count() - 1));
                    _conversationService.AddMessageToUser(chat);

                    string[] urls;
                    string[] names;
                    urls = chat.AttachmentUrls.Split(" ");
                    names = chat.AttachmentNames.Split("/");
                   // Clients.Group(connectedUserID.ToString() + "-" + userID.ToString()).SendAsync("ReceiveMessageByUser", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
                  //  return Clients.Group(userID.ToString() + "-" + connectedUserID.ToString()).SendAsync("ReceiveMessageByUser", chat.UserID, displayName, profilePic, chat.Message, chat.PostedOn, files);
                    await _hubContext.Clients.Group(connectedUserID.ToString() + "-" + userID.ToString()).SendAsync("ReceiveMessageByUser", userID,connectedUserID, messageSenderInfo.userName, messageSenderInfo.profilePic, chat.Message, chat.PostedOn, urls, names);
                    await _hubContext.Clients.Group(userID.ToString() + "-" + connectedUserID.ToString()).SendAsync("ReceiveMessageByUser", userID,connectedUserID, messageSenderInfo.userName, messageSenderInfo.profilePic, chat.Message, chat.PostedOn, urls, names);

                }


            }
            catch (Exception e)
            {
                return $"Error:{e.Message}";
            }
            return "Files uploaded";
        }
    }
}
