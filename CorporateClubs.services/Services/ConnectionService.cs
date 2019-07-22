using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;
using CorporateClubs.Services.Interfaces;
using NLog;

namespace CorporateClubs.Services.Services
{
    public class ConnectionService : IConnections
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public List<FrontEndContacts> GetMyContacts(int userID)
        {
            try
            {
                List<FrontEndContacts> FrontEndContactsList = new List<FrontEndContacts>();
                using (var _context = new ModelContext())
                {
                    
    
                    var contactsList = _context.Contacts.Where(contact => contact.RowDeletedBy == null && contact.UserID == userID && contact.IsRequested == false).ToList();
                    foreach (var contact in contactsList)
                    {
                        FrontEndContacts modifiedContact = new FrontEndContacts();
                        modifiedContact.ConnectedDate = contact.ConnectedDate;
                        modifiedContact.ConnectedUserID = contact.ConnectedUserID;
                        modifiedContact.IsBlock = contact.IsBlock;
                        modifiedContact.IsFavourite = contact.IsFavourite;
                        modifiedContact.IsMute = contact.IsMute;
                        modifiedContact.UserID = contact.UserID;


                        //to get mutual clubs of user;
                        HashSet<int> userClubs = _context.ClubMembers.Where(club => club.UserID == userID && club.RowDeletedBy == null && club.IsRequested == false).Select(club => club.ClubID).ToHashSet();
                        HashSet<int> ClubsOfContact = _context.ClubMembers.Where(club => club.UserID == contact.ConnectedUserID && club.RowDeletedBy == null && club.IsRequested == false).Select(club => club.ClubID).ToHashSet();
                        userClubs.IntersectWith(ClubsOfContact);
                        modifiedContact.MutualClubs = userClubs.Count();
                      


                        Users connectedUserDetails = _context.Users.Single(user => user.UserID == contact.ConnectedUserID);
                        modifiedContact.DisplayName = connectedUserDetails.DisplayName;
                        modifiedContact.MobileNumber = connectedUserDetails.MobileNumber;
                        modifiedContact.ProfilePic = connectedUserDetails.ProfilePic;
                        modifiedContact.Email = connectedUserDetails.Email;
                        modifiedContact.About = connectedUserDetails.About;
                        modifiedContact.Role = connectedUserDetails.Role;
                        modifiedContact.IsActive = connectedUserDetails.IsActive;
                        FrontEndContactsList.Add(modifiedContact);

                    }
                    return FrontEndContactsList;
                }
            }
            catch (Exception ex)
            {
                return new List<FrontEndContacts>();
            }

        }



        public Boolean AddContact(int connectedUserID, int requestID)
        {
            try
            {
                using (var _context = new ModelContext())
                {
                    Contacts newConnection = new Contacts();
                    newConnection.ConnectedUserID = connectedUserID;
                    newConnection.UserID = requestID;
                    newConnection.ConnectedDate = DateTime.Now;
                    newConnection.IsRequested = true;
                    newConnection.RowCreatedBy = requestID;
                    newConnection.RowCreatedOn = DateTime.Now;
                    _context.Add(newConnection);
                    _context.SaveChanges();
                    return true;
                }
            }
            catch (Exception e)
            {
                try
                {
                    using (var _context =new ModelContext())
                    {
                        var contact = _context.Contacts.Single(c => c.UserID == requestID && c.ConnectedUserID == connectedUserID);
                        contact.RowDeletedBy = null;
                        contact.IsRequested = true;
                        contact.RowModifiedBy = requestID;
                        contact.RowModifiedOn = DateTime.Now;
                        _context.SaveChanges();
                        return true;
                    }
                }
                catch(Exception E)
                {
                    return false;
                }

            }

        }

        public List<FrontEndContacts> GetMySuggestions(int userID)
        {
            try
            {
                using (var _context = new ModelContext())
                {
                    List<FrontEndContacts> suggestedUsers = new List<FrontEndContacts>();
                    HashSet<int> allUsersIDS = _context.Users.Where(user => user.RowDeletedBy == null).Select(user => user.UserID).ToHashSet();
                    HashSet<int> allConnectedUsersOfUserIDS = _context.Contacts.Where(usercontact => usercontact.RowDeletedBy == null&&usercontact.UserID==userID).Select(usercontact => usercontact.ConnectedUserID).ToHashSet();
                    allConnectedUsersOfUserIDS.Add(userID);
                    allUsersIDS.ExceptWith(allConnectedUsersOfUserIDS);
                    HashSet<int> suggestedUsersIDS = allUsersIDS;
                    foreach (var suggestedUsersID in suggestedUsersIDS)
                    {
                        Users userDetails = _context.Users.Single(user => user.UserID == suggestedUsersID);
                        FrontEndContacts suggestedUser = new FrontEndContacts();
                        suggestedUser.DisplayName = userDetails.DisplayName;
                        suggestedUser.UserID = userDetails.UserID;
                        suggestedUser.ProfilePic = userDetails.ProfilePic;

                        //for getting count of mutual friends
                        HashSet<int> suggestedUserContacts = _context.Contacts.Where(usercontact => usercontact.UserID == suggestedUsersID && usercontact.RowDeletedBy == null && usercontact.IsRequested == false).Select(usercontact => usercontact.ConnectedUserID).ToHashSet();
                        allConnectedUsersOfUserIDS.IntersectWith(suggestedUserContacts);
                        suggestedUser.MutualFriends = allConnectedUsersOfUserIDS.Count();
                        //for getting count of mutual clubs
                        HashSet<int> userClubs = _context.ClubMembers.Where(club => club.UserID == userID && club.RowDeletedBy == null && club.IsRequested == false).Select(club => club.ClubID).ToHashSet();
                        HashSet<int> suggestedUserClubs = _context.ClubMembers.Where(club => club.UserID == suggestedUsersID && club.RowDeletedBy == null && club.IsRequested == false).Select(club => club.ClubID).ToHashSet();
                        userClubs.IntersectWith(suggestedUserClubs);
                        suggestedUser.MutualClubs = userClubs.Count();
                        suggestedUsers.Add(suggestedUser);
                    }
                    logger.Error("in getting user connections");
                    return suggestedUsers;
                }
            }
            catch (Exception e)
            {
                
                return new List<FrontEndContacts>();
            }
        }


        public bool AcceptRequest(int userID, int connectedUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var contactRow = _context.Contacts.Single(c => c.UserID == userID && c.ConnectedUserID == connectedUserID && c.IsRequested == true && c.RowDeletedBy == null);
                    contactRow.IsRequested = false;
                    contactRow.RowModifiedOn = DateTime.Now;
                    contactRow.RowModifiedBy = userID;
                    Contacts NewContact = new Contacts();
                    NewContact.UserID = connectedUserID;
                    NewContact.ConnectedUserID = userID;
                    NewContact.IsRequested = false;
                    NewContact.RowCreatedBy = userID;
                    NewContact.RowCreatedOn = DateTime.Now;
                    _context.SaveChanges();
                    return true;

                }

                catch (Exception e)
                {
                    return false;
                }
            }
        }


        public bool DeclineRequest(int userID, int connectedUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var contactRow = _context.Contacts.Single(c => c.UserID == userID && c.ConnectedUserID == connectedUserID && c.IsRequested == true && c.RowDeletedBy == null);
                    contactRow.IsRequested = false;
                    contactRow.RowDeletedBy = userID;
                    contactRow.RowModifiedBy = userID;
                    contactRow.RowDeletedOn = DateTime.Now;
                    contactRow.RowModifiedOn = DateTime.Now;
                    contactRow.RowModifiedBy = userID;
                    return true;

                }

                catch (Exception e)
                {
                    return false;
                }
            }
        }

    }

}
