using CorporateClubs.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CorporateClubs.services.Models
{
    public class ClubMembersList
    {
        public Club clubs;
        public ClubMembers members;
        public int count;
    }

    //user modals
    public class Data
    {
        public int UserID;
        public int ClubID;
        public int AdminID;
    }


    public class FileUploadViewModel
    {
        //public IFormFile File { get; set; }
        public string source { get; set; }
        public long Size { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Extension { get; set; }
    }

    public class userTypechangeReason
    {
        public int userID;
        public string reason;
    }


    public class NewUser
    {
        public Users user;
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

}