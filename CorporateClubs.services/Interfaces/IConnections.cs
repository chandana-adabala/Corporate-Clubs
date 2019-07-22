using System.Collections.Generic;
using CorporateClubs.Models.Models;

namespace CorporateClubs.Services.Interfaces
{
    public interface IConnections
    {

        List<ConnectedUser> GetAllContactsOfUser(int userID);
        List<ConnectedUser> GetFavContactsOfUser(int userID);
        bool AddContact(int ConnectedUserID, int requestID);
        List<FrontEndContacts> GetMyContacts(int userID);
        List<FrontEndContacts> GetMySuggestions(int userID);
        bool DeclineRequest(int userID, int connectedUserID);
        bool AcceptRequest(int userID, int connectedUserID);
    }
}