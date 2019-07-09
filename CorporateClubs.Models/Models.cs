
using System;
using System.Collections.Generic;
using System.Text;

namespace CorporateClubs.Models.Models
{
    public class ClubMembersList
    {
        public FrontEndClub clubs { get; set; }
        public FrontEndClubMembers members { get; set; }
        public int count { get; set; }
    }

    //user modals




    public class userTypechangeReason
    {
        public int userID;
        public string reason;
    }


    public class NewUser
    {
        public FrontEndUsers user;
        public Boolean invitation;
        public List<int> clubs;

    }



    //clubs modals

    public class Clubs
    {
        public string ClubType;
        public string Description;
        public string ProfilePic;
        public List<int> Members;
        public List<int> Admins;
        public string ClubTitle;
        public int ClubID;

    }

    public class ClubTypechangeReason
    {
        public int clubID;
        public string reason;
    }

    public class FrontEndUsers
    {
      
        public int UserID { get; set; }//1
     
        public string DisplayName { get; set; }//giraffi_2
     
        public string FirstName { get; set; }//John

        public string MiddleName { get; set; }//Yung

        public string LastName { get; set; }//Rong

        public string MobileNumber { get; set; }//+917988967890

        public string Email { get; set; }//abc@outlook.com

        public string Role { get; set; }// Admin,User

        public string Address { get; set; }


        public string Gender { get; set; }// Female,Male

        public string MartialStatus { get; set; }// Married,UnMarried


        public string BloodGroup { get; set; }//O+,A+...

        public DateTime DOB { get; set; }//2-11-2019 12:00:02AM

        public DateTime LoginCreated { get; set; }// 2-11-2019 12:00:02AM


        public DateTime LastSeen { get; set; }//  2-11-2019 12:00:02AM

    
        public string About { get; set; }// I am happy

      
        public string ProfSum { get; set; }// I am a Full Stack developer


        public string ProfilePic { get; set; }//..

        public bool IsActive { get; set; }// 1 or 0

        public bool IsContactHide { get; set; }// 1 or 0

        public bool IsProfSumHIde { get; set; }// 1 or 0

        public DateTime RowCreatedOn { get; set; }//  2-11-2019 12:00:02AM

        public int? RowCreatedBy { get; set; }// existing user id

        public int? RowDeletedBy { get; set; }// existing user id

    }

    public class FrontEndClub
    {
 
        public int ClubID { get; set; }

        public string ClubTitle { get; set; }// Information Technology

        public string ProfilePic { get; set; }

        public string ClubType { get; set; }// Public-Open Club, Public-Closed Club, Private Club
   
        public int? ClubCreatedBy { get; set; }// existing user id


        public int? ClubDeactiveBy { get; set; }// existing user id
        public DateTime ClubDeactiveOn { get; set; }//2-11-2019 12:00:02AM

        public string Reason { get; set; }

        public DateTime CreatedOn { get; set; }//2-11-2019 12:00:02AM
  
        public string Description { get; set; }// About Club


        public DateTime RowCreatedOn { get; set; }//2-11-2019 12:00:02AM


        public int? RowCreatedBy { get; set; }// existing user id

        public DateTime RowModifiedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowModifiedBy { get; set; }// existing user id
        public DateTime RowDeletedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowDeletedBy { get; set; }// existing user id
    }

    public class FrontEndClubMembers
    {
    
        public int ClubID { get; set; }// Existing club i

        public int UserID { get; set; }// Existing user id

        public string Role { get; set; }// Club Owner, Admin, User

        public DateTime JoiningDate { get; set; }//2-11-2019 12:00:02AM
        public bool IsFavouriteClub { get; set; }// 1 or 0
        public bool IsPersonBlock { get; set; }// 1 or 0
        public bool IsRequested { get; set; }// 1 or 0
        public bool IsClubMute { get; set; }// 1 or 0
        public DateTime LastSeen { get; set; } //2-11-2019 12:00:02AM

        public DateTime RowCreatedOn { get; set; }//2-11-2019 12:00:02AM

        public int? RowCreatedBy { get; set; }// existing user id

        public DateTime RowModifiedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowModifiedBy { get; set; }// existing user id
        public DateTime RowDeletedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowDeletedBy { get; set; }// existing user id

    }
    public class FrontEndContacts
    {
        public int UserID { get; set; }// Existing user id
        public int ConnectedUserID { get; set; }// Existing user id
        public DateTime ConnectedDate { get; set; }//2-11-2019 12:00:02AM
        public bool IsFavourite { get; set; }// 1 or 0
        public bool IsBlock { get; set; }// 1 or 0
        public bool IsRequested { get; set; }// 1 or 0
        public bool IsMute { get; set; }// 1 or 0
        public string ProfilePic { get; set; }//..
        public string Email { get; set; }//abc@outlook.com
        public string MobileNumber { get; set; }//+917988967890
        public int MutualClubs { get; set; } //number
        public int MutualFriends { get; set; }//number
        public string DisplayName { get; set; }//giraffi_2
        public string About { get; set; }// I am happy
        public string Role { get; set; }// Admin,User
        public bool IsActive { get; set; }// 1 or 0
    }
}

