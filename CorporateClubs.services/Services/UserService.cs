using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CorporateClubs.Services.Models;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Models.Models;


namespace CorporateClubs.Services.Services
{
    public class UserService : IUsers
    {
        private ModelContext _context;


        //To get all the users of the club
        public List<ClubMembers> GetAllUsersByClub(int c_id)
        {
            using (var _context = new ModelContext())
            {

                return _context.ClubMembers.Where(c => c.ClubID == c_id && c.RowDeletedBy == null && c.IsRequested==false).ToList();
            }
        }


        //To get all the Requested users of the club
        public List<ClubMembers> GetAllRequestedUsers(int u_id)
        {
            using (var _context = new ModelContext())
            {

                return _context.ClubMembers.Where(c => c.IsRequested == true && c.RowDeletedBy == null).ToList();
            }
        }


        //To get all the users of the application
        public List<Users> GetAllUsers()
        {
            using (var _context = new ModelContext())
            {

                return _context.Users.Where(u => u.RowDeletedBy == null).ToList();
            }
        }


        // To delete user from the application u_id is userid and a_id is admin_id
        public Boolean DeleteUser(int u_id, int a_id,string reason)

        {
            using (var _context = new ModelContext())
            {

                Users user = _context.Users.Single(u => u.UserID == u_id);
                user.RowDeletedBy = a_id;
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }
        }


        //TO Deactive the user in the application
        public Boolean DeactiveUser(int u_id,string reason)
        {
            using (var _context = new ModelContext())
            {

                Users user = _context.Users.Single(u => u.UserID == u_id && u.RowDeletedBy == null);
                user.IsActive = false;
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }
        }


        //TO add user in the application
        public int AddUser(FrontEndUsers newUserInfo)
        {
            using (var _context = new ModelContext())
            {
                Users userModel=new Users();
                userModel.FirstName = newUserInfo.FirstName;
                userModel.LastName = newUserInfo.LastName;
                userModel.MiddleName = newUserInfo.MiddleName;
                userModel.DisplayName = newUserInfo.DisplayName;
                userModel.MobileNumber = newUserInfo.MobileNumber;
                userModel.Email = newUserInfo.Email;

                _context.Users.Add(userModel);
                if (_context.SaveChanges() == 1)
                    return userModel.UserID;
                return 0;
            }

        }


        //To Change  Personal Details of user
        public Boolean Change_Personal_Details(int u_id, String FirstName, String LastName, String Gender, String MartialStatus, String About, String MiddleName, DateTime DOB, String BloodGroup)
        {
            using (var _context = new ModelContext())
            {


                Users user = _context.Users.Single(u => u.UserID == u_id);
                user.FirstName = FirstName;
                user.LastName = LastName;
                user.Gender = Gender;
                user.MartialStatus = MartialStatus;
                user.About = About;
                user.MiddleName = MiddleName;
                user.DOB = DOB;
                user.BloodGroup = BloodGroup;

                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }
        }


        //To change contact details of user
        public Boolean Change_Contact_details(int u_id, String MobileNumber, String Email, String Address)
        {
            using (var _context = new ModelContext())
            {

                Users user = _context.Users.Single(u => u.UserID == u_id);
                user.MobileNumber = MobileNumber;
                user.Email = Email;
                //user.Address=Address
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }
        }

        //To Change Professional Summary
        public Boolean Change_professional_Summary(int u_id, String ProfSum)
        {
            using (var _context = new ModelContext())
            {

                Users user = _context.Users.Single(u => u.UserID == u_id);
                user.ProfSum = ProfSum;

                //user.Address=Address
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }
        }


        //To Block user
        public Boolean BlockUser(int u_id, int c_id)
        {
            using (var _context = new ModelContext())
            {

                ClubMembers ClubMember = _context.ClubMembers.Single(u => u.UserID == u_id && u.ClubID == c_id && u.IsRequested == false && u.RowDeletedBy == null);
                ClubMember.IsPersonBlock = true;
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }

        }

        //to reactivate the user
        public Boolean ReactiveUser(int u_id,string reason)
        {
            using (var _context = new ModelContext())
            {

                Users user = _context.Users.Single(u => u.UserID == u_id && u.RowDeletedBy == null && u.IsActive == false);
                user.IsActive = true;
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }

        }

        //to Unblock the user
        public Boolean UnblockUser(int u_id, int c_id)
        {
            using (var _context = new ModelContext())
            {

                ClubMembers ClubMember = _context.ClubMembers.Single(u => u.UserID == u_id && u.ClubID == c_id && u.IsRequested == false && u.RowDeletedBy == null && u.IsPersonBlock == false);
                ClubMember.IsPersonBlock = false;
                if (_context.SaveChanges() == 1)
                    return true;
                return false;
            }
        }

        //to know wheather a user exists
        public Boolean IsUser(int u_id)
        {
            using (var _context = new ModelContext())
            {

                if (_context.Users.Where(u => u.UserID == u_id).Count() == 1)
                    return true;
                return false;
            }
        }

        //to know wheather a user is a amdin
        public Boolean IsAdmin(int u_id)
        {
            using (var _context = new ModelContext())
            {

                if (_context.Users.Where(u => u.UserID == u_id && u.Role == "admin").Count() == 1)
                    return true;
                return false;
            }
        }
        //to know wheather a user is active
        public Boolean IsDeleted(int u_id)
        {
            using (var _context = new ModelContext())
            {

                if (_context.Users.Where(u => u.UserID == u_id && u.RowDeletedBy == null).Count() == 1)
                    return true;
                return false;
            }
        }

        public void ChangeRole(int u_id, string role)
        {
            using (var _context = new ModelContext())
            {

                Users user = _context.Users.Single(u => u.UserID == u_id && u.RowDeletedBy == null && u.IsActive == true);
                user.Role = role;
                _context.SaveChanges();
            }
        }

        public Users GetUserById(int u_id)
        {
            using (var _context = new ModelContext())
            {
                try
                {

                    return _context.Users.Single(u => u.UserID == u_id && u.RowDeletedBy == null && u.IsActive == true);
                }
                catch(Exception e)
                {
                    return null;
                }
            }
        }

        public void ChangeProfilePic(int userID,string url)
        {
            using(var _context = new ModelContext())
            {
                try
                {
                    Users user = _context.Users.Single(u => u.UserID == userID && u.RowDeletedBy == null && u.IsActive == true);
                    user.ProfilePic = url;
                    _context.SaveChanges();
                }
                catch(Exception e)
                {
                    
                }
            }
        }

        public Users GetUserByEmailId(string emailID)
        {
            using (var _context = new ModelContext())
            {

                return _context.Users.Single(u => u.Email == emailID && u.RowDeletedBy == null && u.IsActive == true);
            }
        }
    }





}
