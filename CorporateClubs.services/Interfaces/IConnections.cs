using System.Collections.Generic;
using CorporateClubs.Models.Models;

namespace CorporateClubs.Services.Interfaces
{
    public interface IConnections
    {
        bool AddContact(int ConnectedUserID, int requestID);
        List<FrontEndContacts> GetMyContacts(int userID);
        List<FrontEndContacts> GetMySuggestions(int userID);
    }
}