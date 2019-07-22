using System;
using System.Collections.Generic;
using System.Text;
using CorporateClubs.Services.Interfaces;
using System.Threading.Tasks;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;
using System.Linq;

namespace CorporateClubs.Services.Services
{
    public class ConversationService:IConversation
    {
        public bool AddMessageToClub(Conversation c)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                  
                    _context.Add(c);
                    _context.SaveChanges();


                }
                catch (Exception e)
                {
                    return false;
                }
                return true;
            }

        }

        public bool AddMessageToUser(OneToOneConversation c)
        {
            using (var _context = new ModelContext())
            {
                try
                {

                    _context.Add(c);
                    _context.SaveChanges();


                }
                catch (Exception e)
                {
                    return false;
                }
                return true;
            }

        }
        public List<MessageSenderInfo> GetAllMessagesOfClub(int clubID)

        {
            using(var _context = new ModelContext())
            {
                List<MessageSenderInfo> messageInfo = new List<MessageSenderInfo>();
                var msgInfo =  _context.Conversation.Where(m => m.ClubID == clubID && m.RowDeletedBy == null).ToList();
                foreach(var msg in msgInfo)
                {
                    string[] urls;
                    string[] names;
                   var userInfo = _context.Users.Single(u =>u.UserID == msg.UserID && u.RowDeletedBy == null && u.IsActive==true);
                    if (msg.AttachmentNames != null)
                    {
                        urls = msg.AttachmentUrls.Split(" ");
                        names = msg.AttachmentNames.Split("/");
                    }
                    else
                    {
                        urls = null;
                        names = null;
                    }
                  
                    var msi = new MessageSenderInfo
                    {
                        userID = userInfo.UserID,
                        clubID = msg.ClubID,
                        message = msg.Message,
                        userName = userInfo.DisplayName,
                        profilePic = userInfo.ProfilePic,
                        postedOn = msg.PostedOn,
                        attachmentUrls = urls,
                        attachmentNames = names
                    };
                    messageInfo.Add(msi);
                }
                return messageInfo;
            }
        }


        public List<OneToOneMessages> GetAllMessagesOfUser(int connectedUserID, int userID)

        {
            using (var _context = new ModelContext())
            {
                List<OneToOneMessages> messageInfo = new List<OneToOneMessages>();

                var connectedUserInfo = _context.Users.Single(u => u.UserID == connectedUserID && u.RowDeletedBy == null && u.IsActive == true);
                var userInfo = _context.Users.Single(u => u.UserID == userID && u.RowDeletedBy == null && u.IsActive == true);
                var msgInfo = _context.OneToOneConversation.Where(m => (m.ConnectedUserID == connectedUserID || m.ConnectedUserID == userID)&&(m.UserID == connectedUserID || m.UserID == userID) && m.RowDeletedBy == null).ToList();
                if(msgInfo.Count() == 0)
                {
                  
                        var msi = new OneToOneMessages
                        {
                            userID = userID,
                            connectedUserID = connectedUserID,
                            userName = userInfo.DisplayName,
                            profilePic = userInfo.ProfilePic
                        };
                        messageInfo.Add(msi);

                   

                }

                foreach (var msg in msgInfo)
                {
                    string[] urls;
                    string[] names;
                    if (msg.AttachmentNames != null)
                    {
                        urls = msg.AttachmentUrls.Split(" ");
                        names = msg.AttachmentNames.Split("/");
                    }
                    else
                    {
                        urls = null;
                        names = null;
                    }
                    if (msg.UserID == userID)
                    {
                        var msi = new OneToOneMessages
                        {
                            userID = msg.UserID,
                            connectedUserID = msg.ConnectedUserID,
                            connectedUserName = connectedUserInfo.DisplayName,
                            userName = userInfo.DisplayName,
                            profilePic = userInfo.ProfilePic,
                            message = msg.Message,
                            postedOn = msg.PostedOn,
                            attachmentUrls = urls,
                            attachmentNames = names

                        };
                        messageInfo.Add(msi);
                    }
                    else
                    {
                        var msi = new OneToOneMessages
                        {
                            userID = msg.UserID,
                            connectedUserID = msg.ConnectedUserID,
                            userName = connectedUserInfo.DisplayName,
                            connectedUserName = userInfo.DisplayName,
                            profilePic = connectedUserInfo.ProfilePic,
                            message = msg.Message,
                            postedOn = msg.PostedOn,
                            attachmentUrls = urls,
                            attachmentNames = names
                        };
                        messageInfo.Add(msi);
                    }
                  
                  
                }
                return messageInfo;
            }
        }
    }

   
}
