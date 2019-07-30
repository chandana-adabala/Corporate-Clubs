using System;
using System.Collections.Generic;
using System.Text;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;
using System.Threading.Tasks;

namespace CorporateClubs.Services.Interfaces
{
    public interface IConversation
    {
       bool AddMessageToClub(Conversation c);
        List<MessageSenderInfo> GetAllMessagesOfClub(int clubID);
        List<OneToOneMessages> GetAllMessagesOfUser(int connectionID,int userID);
        bool AddMessageToUser(OneToOneConversation c);
    }
}
