using System.Collections.Generic;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;

namespace CorporateClubs.Services.Interfaces
{
    public interface IClubs
    {
       int AddClub(string clubTitle, string description, string clubType, List<int> clubMembers, string imageURL, int currentUserID, List<int> clubAdmins = null);
        bool Addmember(int clubID, int addedUserID, int currentUserID, bool isRequested = false,string role="User");
        bool AddMembers(int clubID, List<int> members, int currentUserID);
        bool DeleteClub(int clubID, int currentUserID,string reason);
        List<Club> GetAllClubs();
        List<Club> GetAllClubsOfUser(int userID);
        Club GetClubById(int clubID);
        List<ClubMembers> GetAllReqMembers(int clubID);
        List<Users> GetNonClubMembers(int clubID);
        List<Club> GetFavClubsOfUser(int clubID);
        List<Club> GetInactiveClubs();
        bool IsClubPrivate(int clubID);
        bool IsClubPublicClosed(int clubID);
        bool IsClubPublicOpen(int clubID);
        bool MakeClubActive(int clubID,string reason);
        bool MakeClubDeactive(int clubID, string reason, int currentUserID);
        bool MakeClubFavNUnFav(int clubID, int userID);
        bool MakeClubMuteNUnMute(int clubID, int userID);
        bool CancelRequestOfUserForClub(int clubID, int userID);
        bool MakeRequestOfUserForClub(int clubID, int userID, string role);
        bool AddUsertoPublicClub(int clubID, int userID, string role);
        bool RemoveUser(int clubID, int userID, int currentUserID);
        bool UpdateClub(int clubID, string ClubTitle, string description, string ImageURl);
        bool AcceptRequest(int clubID, int addedUserID, int currentUserID);
        bool RejectRequest(int clubID, int addedUserID, int currentUserID);
        bool ChangeClubType(string clubType,int clubID, int currentUserID);
        List<ClubMembersList> GetClubMembersListofUser(int userID);
        bool BlockOrUnBlockUser(int clubID, int userID, int requestID);
        bool RemoveUserAsAdmin(int clubID, int userID, int requestID);
        bool changeProfilePicOfClub(int clubID, string imageURL);
    }
}