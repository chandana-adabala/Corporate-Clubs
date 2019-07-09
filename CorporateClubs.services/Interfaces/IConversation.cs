using System;
using System.Collections.Generic;
using System.Text;
using CorporateClubs.Services.Models;
using System.Threading.Tasks;

namespace CorporateClubs.Services.Interfaces
{
    public interface IConversation
    {
       bool AddMessageToClub(Conversation c);
        List<Conversation> GetAllMessagesOfClub(int clubID);
    }
}
