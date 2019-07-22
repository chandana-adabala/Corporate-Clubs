using System;
using System.Collections.Generic;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;
namespace CorporateClubs.Services.Interfaces
{
    public interface IUsers
    {
        int AddUser(FrontEndUsers user,int adminUserID);
        bool BlockUser(int u_id, int c_id);
        void ChangeRole(int u_id, string role);
        bool Change_Contact_details(int u_id, string MobileNumber, string Email, string Address);
        bool Change_Personal_Details(int u_id, string FirstName, string LastName, string Gender, string MartialStatus, string About, string MiddleName, DateTime DOB, string BloodGroup,string DisplayName);
        bool Change_professional_Summary(int u_id, string ProfSum);
        bool DeactiveUser(int u_id,string reason);
        bool DeleteUser(int u_id, int a_id,string reason);
        List<ClubMembers> GetAllRequestedUsers(int u_id);
        List<Users> GetAllUsers();
        List<ClubMembers> GetAllUsersByClub(int c_id);
        Users GetUserById(int u_id);
        bool IsAdmin(int u_id);
        bool IsDeleted(int u_id);
        bool IsUser(int u_id);
        bool ReactiveUser(int u_id,string reason);
        void ChangeProfilePic(int userID, string url);
        bool UnblockUser(int u_id, int c_id);
        Users GetUserByEmailId(string emailID);
    }
}