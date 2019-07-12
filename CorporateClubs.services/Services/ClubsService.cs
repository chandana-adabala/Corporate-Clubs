using CorporateClubs.Services.Interfaces;
using CorporateClubs.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;

namespace CorporateClubs.Services.Services
{
    public class ClubsService : IClubs
    {
        //private readonly ModelContext _context;

        //public ClubsService(ModelContext context)
        //{

        //    _context = context;
        //}

        public List<Club> GetAllClubs()
        {
            using (var _context = new ModelContext())
            {
                return _context.Clubs.ToList();
            }
        }
        public List<Club> GetAllClubsOfUser(int userID)
        {

            List<Club> ClubDetails = new List<Club>();


            using (var _context = new ModelContext())
            {
                var clubs = _context.ClubMembers.Where(c => c.UserID == userID).Select(c => new
                {
                    clubid = c.ClubID
                });
                foreach (var club in clubs)
                {
                    Club GetClub = _context.Clubs.Single(c => c.ClubID == club.clubid);
                    ClubDetails.Add(GetClub);
                }

                return ClubDetails;

            }
        }

        public Club GetClubById(int clubID)
        {


            using (var _context = new ModelContext())
            {
                Club club = _context.Clubs.Single(c => c.ClubID == clubID);

                return club;



            }
        }


        public List<Club> GetFavClubsOfUser(int userID)
        {

            List<Club> ClubDetails = new List<Club>();


            using (var _context = new ModelContext())
            {
                var clubs = _context.ClubMembers.Where(c => c.UserID == userID && c.IsFavouriteClub == true).Select(c => new
                {
                    clubid = c.ClubID
                });
                foreach (var club in clubs)
                {
                    Club GetClub = _context.Clubs.Single(c => c.ClubID == club.clubid);
                    ClubDetails.Add(GetClub);
                }

                return ClubDetails;

            }
        }

        public List<ClubMembers> GetAllReqMembers(int clubID)
        {
            using (var _context = new ModelContext())
            {
                return _context.ClubMembers.Where(c => c.ClubID == clubID && c.IsRequested == true && c.RowDeletedBy == null).ToList();
            }
        }
        public List<Users> GetNonClubMembers(int clubID)
        {
            List<Users> clubUsers = new List<Users>();
            using (var _context = new ModelContext())
            {
                var clubMem = _context.ClubMembers.Where(c => c.ClubID == clubID && c.RowDeletedBy == null).Select(u => new { userid = u.UserID });
                foreach (var mem in clubMem)
                {
                    Users user = _context.Users.Single(u => u.UserID == mem.userid);
                    clubUsers.Add(user);
                }
                return _context.Users.Except(clubUsers).ToList();

            }
        }

        public List<Club> GetInactiveClubs()
        {
            using (var _context = new ModelContext())
            { return _context.Clubs.Where(c => c.ClubDeactiveBy != null && c.RowDeletedBy == null).ToList(); }
        }



        public int AddClub(string clubTitle, string description, string clubType, List<int> clubMembers, string imageURL, int currentUserID, List<int> clubAdmins = null)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var club = new Club
                    {
                        ClubTitle = clubTitle,
                        Description = description,
                        ClubType = clubType,
                        ProfilePic = imageURL
                    };
                    _context.Add(club);
                    _context.SaveChanges();
                    AddMembers(club.ClubID, clubMembers, currentUserID);
                    // todo: add admins
                    return club.ClubID;
                }
                catch (Exception)
                {
                    return 0;
                }

            }

        }

        public bool Addmember(int clubID, int addedUserID, int currentUserID, bool isRequested = false)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var member = new ClubMembers
                    {
                        ClubID = clubID,
                        UserID = addedUserID,
                        Role = "User",
                        JoiningDate = DateTime.Now,
                        IsFavouriteClub = false,
                        IsPersonBlock = false,
                        IsRequested = isRequested,
                        IsClubMute = false,
                        LastSeen = DateTime.Now,
                        RowCreatedOn = DateTime.Now,
                        RowCreatedBy = currentUserID,
                        RowDeletedBy = null

                    };
                    _context.Add(member);
                    _context.SaveChanges();
                }
                catch (Exception e)
                {

                    return false;
                }
                return true;
            }
        }

        public bool AcceptRequest(int clubID, int addedUserID, int currentUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    ClubMembers club = _context.ClubMembers.Single(u => u.UserID == addedUserID && u.ClubID == clubID && u.RowDeletedBy == null);
                    club.IsRequested = false;
                    _context.SaveChanges();

                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool RejectRequest(int clubID, int addedUserID, int currentUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    ClubMembers club = _context.ClubMembers.Single(u => u.UserID == addedUserID && u.ClubID == clubID && u.RowDeletedBy == null);
                    club.RowDeletedBy = currentUserID;
                    _context.SaveChanges();

                }
                catch
                {
                    return false;
                }
                return true;
            }
        }
        public bool AddMembers(int clubID, List<int> members, int currentUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    foreach (int mem in members)
                    {
                        if (Addmember(clubID, mem, currentUserID) == false)
                        {
                            return false;
                        }
                    }
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool DeleteClub(int clubID, int currentUserID, string reason)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    Club c = (from x in _context.Clubs
                              where x.ClubID == clubID
                              select x).First();
                    c.RowDeletedBy = currentUserID;
                    c.Reason = reason;
                    _context.SaveChanges();

                    var users = _context.ClubMembers.Where(clubmember => clubmember.ClubID == clubID);
                    foreach (ClubMembers u in users)
                    {
                        u.RowDeletedBy = currentUserID;
                    }
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }





        public bool MakeClubActive(int clubID, string reason)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    Club c = (from x in _context.Clubs
                              where x.ClubID == clubID
                              select x).First();
                    c.ClubDeactiveBy = null;
                    c.Reason = reason;
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool MakeClubDeactive(int clubID, string reason, int currentUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    Club c = (from x in _context.Clubs
                              where x.ClubID == clubID
                              select x).First();
                    c.ClubDeactiveBy = currentUserID;
                    c.Reason = reason;
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool MakeClubFavNUnFav(int clubID, int userID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    ClubMembers c = (from x in _context.ClubMembers
                                     where x.ClubID == clubID && x.UserID == userID
                                     select x).First();
                    c.IsFavouriteClub = !(c.IsFavouriteClub);
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool MakeClubMuteNUnMute(int clubID, int userID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    ClubMembers c = (from x in _context.ClubMembers
                                     where x.ClubID == clubID && x.UserID == userID
                                     select x).First();
                    c.IsClubMute = !(c.IsClubMute);
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool MakeNCancelRequest(int clubID, int userID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    ClubMembers c = (from x in _context.ClubMembers
                                     where x.ClubID == clubID && x.UserID == userID
                                     select x).First();
                    c.IsRequested = !(c.IsRequested);
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool RemoveUser(int clubID, int userID, int currentUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    ClubMembers c = (from x in _context.ClubMembers
                                     where x.ClubID == clubID && x.UserID == userID
                                     select x).First();
                    c.RowDeletedBy = currentUserID;
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;
            }
        }

        public bool UpdateClub(int clubID, string ClubTitle, string description, string ImageURL)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var club = _context.Clubs.Single(c => clubID == c.ClubID);
                    club.ClubTitle = ClubTitle;
                    club.Description = description;
                    club.ProfilePic = ImageURL;
                    _context.SaveChanges();
                }
                catch
                {
                    return false;
                }
                return true;

            }
        }

        public bool ChangeClubType(string clubType, int clubID, int currentUserID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var club = _context.Clubs.Single(c => clubID == c.ClubID);
                    club.ClubType = clubType;
                    _context.SaveChanges();

                }
                catch
                {
                    return false;
                }
                return true;
            }
        }





        public bool IsClubPrivate(int clubID)
        {
            using (var _context = new ModelContext())
            {
                var type = _context.Clubs.Where(c => c.ClubID == clubID && c.ClubType == "Private").ToList();
                if (type == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

        public bool IsClubPublicClosed(int clubID)
        {
            using (var _context = new ModelContext())
            {
                var type = _context.Clubs.Where(c => c.ClubID == clubID && c.ClubType == "Public Closed").ToList();
                if (type == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

        public bool IsClubPublicOpen(int clubID)
        {
            using (var _context = new ModelContext())
            {
                var type = _context.Clubs.Where(c => c.ClubID == clubID && c.ClubType == "Public Open").ToList();
                if (type == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }


        public List<ClubMembersList> GetClubMembersListofUser(int userID)
        {
            using (var _context = new ModelContext())
            {
                try
                {
                    var clubMembersList = _context.Clubs.GroupJoin(_context.ClubMembers.Where(c => c.UserID == userID && c.RowDeletedBy == null), c => c.ClubID, m => m.ClubID, (clubs, members) => new { clubs, members }).SelectMany(z => z.members.DefaultIfEmpty(), (club, member) => new
                    {
                        club = club.clubs,
                        member = member,
                        count = _context.ClubMembers.Where(c => c.ClubID == club.clubs.ClubID).Count()

                    })
                    .ToList();

                    List<ClubMembersList> modifiedClubMembersList = new List<ClubMembersList>();
                    foreach (var clubMember in clubMembersList)
                    {
                        ClubMembersList modifiedClubMember = new ClubMembersList();
                        modifiedClubMember.clubs = new FrontEndClub();
                        modifiedClubMember.members = new FrontEndClubMembers();
                        modifiedClubMember.clubs.ClubID = clubMember.club.ClubID;
                        modifiedClubMember.clubs.ClubTitle = clubMember.club.ClubTitle;
                        modifiedClubMember.clubs.ProfilePic = clubMember.club.ProfilePic;
                        modifiedClubMember.clubs.ClubType = clubMember.club.ClubType;
                        modifiedClubMember.clubs.ClubCreatedBy = clubMember.club.ClubCreatedBy;
                        modifiedClubMember.clubs.CreatedOn = clubMember.club.CreatedOn;
                        modifiedClubMember.clubs.Description = clubMember.club.Description;
                        modifiedClubMember.clubs.ClubCreatedBy = clubMember.club.ClubCreatedBy;
                        modifiedClubMember.clubs.RowDeletedBy = clubMember.club.RowDeletedBy;
                        modifiedClubMember.clubs.ClubDeactiveBy = clubMember.club.ClubDeactiveBy;
                        modifiedClubMember.count = clubMember.count;


                        if (clubMember.member != null)
                        {
                            modifiedClubMember.members.ClubID = clubMember.member.ClubID;
                            modifiedClubMember.members.UserID = clubMember.member.UserID;
                            modifiedClubMember.members.Role = clubMember.member.Role;
                            modifiedClubMember.members.IsPersonBlock = clubMember.member.IsPersonBlock;
                            modifiedClubMember.members.IsRequested = clubMember.member.IsRequested;
                            modifiedClubMember.members.UserID = clubMember.member.UserID;
                        }

                        else
                        {
                            modifiedClubMember.members = null;
                        }


                        modifiedClubMembersList.Add(modifiedClubMember);
                        
                    }
                    return modifiedClubMembersList;

                }
                catch (Exception E)
                {
                    return new List<ClubMembersList>();
                }
            }

        }
    }
}
