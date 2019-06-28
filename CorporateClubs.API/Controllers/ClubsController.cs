using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CorporateClubs.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubsController : ControllerBase
    {
        private readonly IClubs _clubs;
        private readonly IUsers _users;

        public ClubsController(IClubs clubs, IUsers users)
        {
            _clubs = clubs;
            _users = users;

        }
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
       
        [HttpGet]
        [Route("getallclubs/{requestID:int}")]
        public ActionResult<List<Club>> GetAllClubs(int requestID)
        {
            try
            {   if (_users.IsUser(requestID) == true)
                    return _clubs.GetAllClubs();
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallclubsofusers/{requestID:int}/{userID:int}")]
        public ActionResult<List<Club>> GetAllClubsofusers(int requestID,int userID)
        {
            try
            {  if(_users.IsUser(requestID) == true)
                return _clubs.GetAllClubsOfUser(userID);
                else
                 return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getclubbyid/{requestID:int}/{userID:int}")]
        public ActionResult<Club> GetClubByID(int requestID, int userID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                    return _clubs.GetClubById(userID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallfavclubsofuser/{requestID:int}/{userID:int}")]
        public ActionResult<List<Club>> GetFavClubsofUser(int requestID, int userID)
        {
            try
            {
                if(_users.IsUser(requestID) == true)
                return _clubs.GetFavClubsOfUser(userID);
                else
                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallrequestedmembers/{requestID:int}/{clubID:int}")]
        public ActionResult<List<ClubMembers>> GetAllRequestedMembers(int requestID, int clubID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                    return _clubs.GetAllReqMembers(clubID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("getnonclubmembers/{requestID:int}/{clubID:int}")]
        public ActionResult<List<Users>> GetNonClubMembers(int requestID, int clubID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                    return _clubs.GetNonClubMembers(clubID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getinactiveclubs/{requestID:int}")]
        public ActionResult<List<Club>> GetInactiveClubs(int requestID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                    return _clubs.GetInactiveClubs();
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("addclub/{requestID:int}")]
        public ActionResult<string> AddClub ([FromBody] Clubs ca,int requestID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    int s = _clubs.AddClub(ca.c.ClubTitle, ca.c.Description, ca.c.ClubType, ca.Members, ca.c.ProfilePic, requestID, ca.Admins);
                    if (s != 0)
                        return s.ToString();
                    return BadRequest();
                }
                else
                    return  Unauthorized();

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("addmembers/{requestID:int}")]
        public ActionResult AddMembers([FromBody] Clubs ca, int requestID)
        {
            try
            {
                if (_clubs.AddMembers(ca.ClubID, ca.Members, requestID) == true)
                    return Ok();
                return BadRequest();

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("acceptrequest/{requestID:int}/{clubID:int}/{userID:int}")]
        public ActionResult AcceptRequest(int clubID,int userID,int requestID)
        {
            try
            {
                if (_clubs.AcceptRequest(clubID, userID, requestID) == true)
                    return Ok();
                return BadRequest();
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("rejectrequest/{requestID:int}/{clubID:int}/{userID:int}")]
        public ActionResult RejectRequest(int clubID, int userID, int requestID)
        {
            try
            {
                if (_clubs.RejectRequest(clubID, userID, requestID) == true)
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        [HttpPut]
        [Route("deleteclub/{requestID:int}")]
        public ActionResult DeleteClub(int requestID, [FromBody]ClubTypechangeReason clubID_Reason)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                { 
                    if (_clubs.DeleteClub(clubID_Reason.clubID, requestID, clubID_Reason.reason) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }
       

        [HttpPut]
        [Route("makeclubactive/{requestID:int}")]
        public ActionResult MakeClubActive(int requestID, [FromBody]ClubTypechangeReason clubID_Reason)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.MakeClubActive(clubID_Reason.clubID, clubID_Reason.reason) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }


   

        [HttpPut]
        [Route("makeclubdeactive/{requestID:int}/{ClubID:int}")]
        public ActionResult MakeClubDeactive(int requestID, int clubID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.MakeClubDeactive(clubID, "need to be changed", requestID) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }

      



        [HttpPut]
        [Route("makeclubfavunfav/{requestID:int}/{ClubID:int}")]
        public ActionResult MakeClubFavNUnFav(int requestID, int clubID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.MakeClubFavNUnFav(clubID, requestID) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }



        [HttpPut]
        [Route("makeclubmuteUnmute/{requestID:int}/{ClubID:int}")]
        public ActionResult MakeClubMuteNUnMute(int requestID, int clubID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.MakeClubMuteNUnMute(clubID, requestID) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }




        [HttpPut]
        [Route("MakeNCancelRequest/{requestID:int}/{ClubID:int}/{UserID:int}")]
        public ActionResult MakeNCancelRequest(int requestID, int clubID, int userID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.MakeNCancelRequest(clubID, userID) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [Route("RemoveUser/{requestID:int}/{userID:int}/{ClubID:int}")]
        public ActionResult RemoveUser(int requestID, int clubID,int userID)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.RemoveUser(clubID, userID, requestID) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }

     

       

        [HttpPut]
        [Route("updateclub/{requestID:int}")]
        public ActionResult UpdateClubr(int requestID, int clubID, int userID, [FromBody]Club c)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.UpdateClub(c.ClubID, c.ClubTitle, c.Description, c.ProfilePic)==true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("changeclubtype/{requestID:int}/{clubID:int}/{clubType}")]
        public ActionResult ChangeClubType(int requestID, int clubID, string clubType)
        {
            try
            {
                if (_users.IsUser(requestID) == true)
                {
                    if (_clubs.ChangeClubType(clubType,clubID,requestID) == true)
                        return Ok();
                    return BadRequest();
                }

                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}