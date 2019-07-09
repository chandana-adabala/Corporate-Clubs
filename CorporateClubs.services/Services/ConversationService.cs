using System;
using System.Collections.Generic;
using System.Text;
using CorporateClubs.Services.Interfaces;
using System.Threading.Tasks;
using CorporateClubs.Services.Models;
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

        public List<Conversation> GetAllMessagesOfClub(int clubID)
        {
            using(var _context = new ModelContext())
            {
                
                    return _context.Conversation.Where(m => m.ClubID == clubID && m.RowDeletedBy == null).ToList();
               
            }
        }
    }

   
}
