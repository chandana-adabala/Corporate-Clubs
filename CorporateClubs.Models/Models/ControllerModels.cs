]using System;
using System.Collections.Generic;
using System.Text;


namespace CorporateClubs.Models.Models
{
    class ControllerModels
    {
        public class Data
        {
            public int UserID;
            public int AdminID;
            public int ClubID;
            public String Reason;
            public int CurrentUserID;

        }

        public class Clubs
        {
            public Club c;
            public List<int> Members;
            public List<int> Admins;
            public int ClubID;
        }

        public class ClubTypechangeReason
        {
            public int clubID;
            public string reason;
        }

    }
}
