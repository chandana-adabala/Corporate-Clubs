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

        public List<MessageSenderInfo> GetAllMessagesOfClub(int clubID)

        {
            using(var _context = new ModelContext())
            {
                List<MessageSenderInfo> messageInfo = new List<MessageSenderInfo>();
                var msgInfo =  _context.Conversation.Where(m => m.ClubID == clubID && m.RowDeletedBy == null).ToList();
                foreach(var msg in msgInfo)
                {
                   var userInfo = _context.Users.Single(u =>u.UserID == msg.UserID && u.RowDeletedBy == null && u.IsActive==true);

                    var msi = new MessageSenderInfo
                    {
                        userID = userInfo.UserID,
                        clubID = msg.ClubID,
                        message = msg.Message,
                        userName = userInfo.DisplayName,
                        profilePic = userInfo.ProfilePic,
                        postedOn = msg.PostedOn
                    };
                    messageInfo.Add(msi);
                }
                return messageInfo;
            }
        }
    }

   
}
