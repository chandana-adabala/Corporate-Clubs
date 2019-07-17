
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CorporateClubs.Services.Interfaces;
using CorporateClubs.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CorporateClubs.Models.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace CorporateClubs.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClubsController : ControllerBase
    {
        private readonly IClubs _clubs;
        private readonly IUsers _users;
        private IHostingEnvironment _env;

        public ClubsController(IClubs clubs, IUsers users, IHostingEnvironment env)
        {
            _clubs = clubs;
            _users = users;
            _env = env;

        }
    
        [HttpGet]
        [Route("getallclubs")]
        public ActionResult<List<Club>> GetAllClubs()
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {   if (_users.IsUser(requestedUser.UserID) == true)
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
        [Route("getallclubsofusers")]
        public ActionResult<List<Club>> GetAllClubsofusers()
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {  if(_users.IsUser(requestedUser.UserID) == true)
                return _clubs.GetAllClubsOfUser(requestedUser.UserID);
                else
                 return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getclubbyid/{clubID:int}")]
        public ActionResult<Club> GetClubByID(int clubID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    return _clubs.GetClubById(clubID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallfavclubsofuser")]
        public ActionResult<List<Club>> GetFavClubsofUser()
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    return _clubs.GetFavClubsOfUser(requestedUser.UserID);
                else
                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallrequestedmembers/{clubID:int}")]
        public ActionResult<List<ClubMembers>> GetAllRequestedMembers(int clubID)
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
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
        [Route("getnonclubmembers/{clubID:int}")]
        public ActionResult<List<Users>> GetNonClubMembers(int clubID)
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {

                if (_users.IsUser(requestedUser.UserID) == true)
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
        [Route("getinactiveclubs")]
        public ActionResult<List<Club>> GetInactiveClubs()
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
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
        [Route("addclub")]
        public ActionResult<string> AddClub ([FromBody] Clubs newClub)
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    int s = _clubs.AddClub(newClub.ClubTitle, newClub.Description, newClub.ClubType, newClub.Members, newClub.ProfilePic, requestedUser.UserID, newClub.Admins);
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
        [Route("addmembers")]
        public ActionResult AddMembers([FromBody] Clubs clubMembers)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            { 
                 if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.AddMembers(clubMembers.ClubID, clubMembers.Members, requestedUser.UserID) == true)
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
        [HttpPost]
        [Route("acceptrequest/{clubID:int}/{userID:int}")]
        public ActionResult AcceptRequest(int clubID,int userID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.AcceptRequest(clubID, userID, requestedUser.UserID) == true)
                        return Ok();
                    return BadRequest();
                }
                return Unauthorized();
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("rejectrequest/{clubID:int}/{userID:int}")]
        public ActionResult RejectRequest(int clubID, int userID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.RejectRequest(clubID, userID, requestedUser.UserID) == true)
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
        [Route("deleteclub")]
        public ActionResult DeleteClub([FromBody]ClubTypechangeReason clubID_Reason)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                { 
                    if (_clubs.DeleteClub(clubID_Reason.clubID, requestedUser.UserID, clubID_Reason.reason) == true)
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
        [Route("makeclubactive")]
        public ActionResult MakeClubActive([FromBody]ClubTypechangeReason clubID_Reason)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
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
        [Route("makeclubdeactive/{ClubID:int}")]
        public ActionResult MakeClubDeactive(int clubID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.MakeClubDeactive(clubID, "need to be changed", requestedUser.UserID) == true)
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
        [Route("makeclubfavunfav/{ClubID:int}")]
        public ActionResult MakeClubFavNUnFav(int clubID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.MakeClubFavNUnFav(clubID, requestedUser.UserID) == true)
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
        [Route("makeclubmuteUnmute/{ClubID:int}")]
        public ActionResult MakeClubMuteNUnMute(int clubID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.MakeClubMuteNUnMute(clubID, requestedUser.UserID) == true)
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
        [Route("MakeNCancelRequest/{ClubID:int}/{UserID:int}")]
        public ActionResult MakeNCancelRequest(int clubID, int userID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
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
        [Route("RemoveUser/{userID:int}/{clubID:int}")]
        public ActionResult RemoveUser(int clubID,int userID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.RemoveUser(clubID, userID, requestedUser.UserID) == true)
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
        [Route("updateclub")]
        public ActionResult UpdateClub( [FromBody]Clubs clubDetails)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.UpdateClub(clubDetails.ClubID, clubDetails.ClubTitle, clubDetails.Description, clubDetails.ProfilePic)==true)
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
        [Route("changeclubtype/{clubID:int}/{clubType}")]
        public ActionResult ChangeClubType(int clubID, string clubType)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    if (_clubs.ChangeClubType(clubType,clubID, requestedUser.UserID) == true)
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

        [HttpGet]
        [Route("getclubmemberslist")]
        public ActionResult<List<ClubMembersList>> GetClubMembersList()
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                {
                    return _clubs.GetClubMembersListofUser(requestedUser.UserID);
                }
                return Unauthorized();
            }


            catch (Exception e)
            {
                return BadRequest();
            }

        }
        [HttpPost]
        [Route("UploadImage/{clubID:int}")]
        public async Task<ActionResult> UploadImage(IFormFile image, int clubID)
        {
            var webRoot = _env.WebRootPath;

            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (image.Length > 0)
                {
                    var url = "http://localhost:3333/images";
                    var fileType = '.' + image.ContentType.Split('/')[1];
                    var name = "club" + clubID + fileType;
                    var file1 = System.IO.Path.Combine(webRoot, name);
                    using (var stream = new FileStream(file1, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    if (_clubs.changeProfilePicOfClub(clubID, url + '/' + name))
                        return Ok();
                    else
                        return BadRequest();
                    
                    
                }
            }
            catch (Exception e)
            {
                return BadRequest();
            }

            return Unauthorized();
        }




        [HttpPut]
        [Route("blockorunblockuserInAClub/{clubID:int}/{userID:int}")]
        public ActionResult BlockOrUnBlockUserInAClub(int clubID, int userID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if(_users.IsUser(requestedUser.UserID))
                {
                    if (_clubs.BlockOrUnBlockUser(clubID, userID, requestedUser.UserID))
                        return Ok();
                    else
                        return BadRequest();
                }
                return Unauthorized();
            }
            catch(Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("RemoveAsAdmin/{clubID:int}/{userID:int}")]
        public ActionResult RemoveAsAdmin (int clubID, int userID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID))
                {
                    if (_clubs.RemoveUserAsAdmin(clubID, userID, requestedUser.UserID))
                        return Ok();
                    else
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