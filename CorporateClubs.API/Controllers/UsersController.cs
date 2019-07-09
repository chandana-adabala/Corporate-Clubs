using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CorporateClubs.Services.Models;
using CorporateClubs.Services.Services;
using CorporateClubs.Services.Interfaces;
using System.Net.Http;
using Microsoft.AspNetCore.Cors;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using CorporateClubs.Models.Models;

namespace CorporateClubs.API.Controllers
{
    [Authorize]
    [EnableCors("allowmyorgin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsers _users;
        private readonly IClubs _clubs;
        private IHostingEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsersController(IUsers users, IClubs clubs, IHostingEnvironment env)
        {
            _users = users;
            _clubs = clubs;
            _env = env;

        }


        // GET: api/Users/GetAllUsersByClub/clubID

        [HttpGet]
        [Route("getallusersbyclub/{clubID:int}")]
        public ActionResult<List<ClubMembers>> GetAllUsersByClub(int clubID)
        {
            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsUser(requestedUser.UserID))
                {
                    return _users.GetAllUsersByClub(clubID);
                }
                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        // GET: api/Users/GetAllRequestedUsers/clubID
        [HttpGet]
        [Route("getallrequestedusers/{clubID:int}")]
        public ActionResult<List<ClubMembers>> GetAllRequestedUsers(int clubID)
        {
            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsUser(requestedUser.UserID))
                {
                    if (_users.GetAllRequestedUsers(clubID).Count() != 0)
                        return _users.GetAllRequestedUsers(clubID);
                    return NoContent();
                }
                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // GET: api/Users/GetAllUsers
        [HttpGet]
        [Route("getallusers")]
        public ActionResult<List<Users>> GetAllUsers()
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID))
                {
                    if (_users.GetAllUsers().Count() != 0)
                        return _users.GetAllUsers();
                    return NotFound();
                }
                return Unauthorized();
            }

            catch (Exception e)
            {
                return BadRequest();
            }
        }


        // GET: api/Users/Delete/userID
        [HttpPut]
        [Route("deleteuser")]
        public ActionResult DeleteUser(userTypechangeReason idReason)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsAdmin(requestedUser.UserID))
                {
                    if (_users.DeleteUser(idReason.userID, requestedUser.UserID, idReason.reason))
                        return Ok();
                    return NotFound();

                }
                return Unauthorized();
            }

            catch (Exception e)
            {
                return BadRequest();
            }

        }

        // GET: api/Users/DeactiveUser/userID
        [HttpPut]
        [Route("deactivateuser")]
        public ActionResult DeactiveUser(userTypechangeReason idReason)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsAdmin(requestedUser.UserID))
                {
                    if (_users.DeactiveUser(idReason.userID, idReason.reason))
                        return Ok();
                    return NotFound();
                }
                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        [HttpPost]
        [Route("AddUser")]
        public ActionResult<String> AddUser([FromBody]NewUser userDetails)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsAdmin(requestedUser.UserID))
                {
                    int userID = _users.AddUser(userDetails.user);
                    foreach (int i in userDetails.clubs)
                    {
                        _clubs.Addmember(i, userID, requestedUser.UserID);
                    }
                    if (userID != 0)
                        return userID.ToString();
                    else
                        BadRequest();
                }
                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        [HttpPut]
        [Route("changepersonaldetails")]
        public ActionResult ChangePersonalDetails([FromBody]Users user)
        {
            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsUser(requestedUser.UserID) && requestedUser.UserID == user.UserID)
                {
                    if (_users.Change_Personal_Details(user.UserID, user.FirstName, user.LastName, user.Gender, user.MartialStatus, user.About, user.MiddleName, user.DOB, user.BloodGroup) == true)
                        return Ok();
                    return BadRequest();
                }
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        [HttpPut]
        [Route("changecontactdetails")]
        public ActionResult ChangeContactDetails([FromBody] Users user)
        {

            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsUser(requestedUser.UserID) && requestedUser.UserID == user.UserID)
                {
                    if (_users.Change_Contact_details(user.UserID, user.MobileNumber, user.Email, user.Address) == true)
                        return Ok();
                    return BadRequest();
                }

                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [Route("changeprofessionalsummary")]
        public ActionResult ChangeProfessionalSummary([FromBody] Users user)
        {

            try
            {

                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsUser(requestedUser.UserID) && requestedUser.UserID == user.UserID)
                {
                    if (_users.Change_professional_Summary(user.UserID, user.ProfSum) == true)
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


        [HttpPut]
        [Route("blockuser/{userID:int}/{clubID:int}")]
        public ActionResult BlockUser(int userID, int clubID)
        {
            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsAdmin(requestedUser.UserID))
                {
                    if (_users.BlockUser(userID, clubID) == true)
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




        [HttpPut]
        [Route("reactivateuser")]
        public ActionResult ReactivateUser(userTypechangeReason idReason)
        {

            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsAdmin(requestedUser.UserID))
                    if (_users.ReactiveUser(idReason.userID, idReason.reason) == true)

                        return Ok();
                    else
                        return BadRequest();


                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("unblockuser{userID:int}/{clubID:int}")]
        public ActionResult UnBlockUser(int userID, int clubID)
        {
            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users requestedUser = _users.GetUserByEmailId(uniqueId);
                if (_users.IsAdmin(requestedUser.UserID))
                    if (_users.UnblockUser(userID, clubID) == true)
                        return Ok();
                    else
                        return BadRequest();


                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        [HttpGet]
        [Route("getuserbyid/{userID:int}")]
        public ActionResult<Users> GetUserById(int userID)
        {
            try
            {
                Users User = _users.GetUserById(userID);
                if (User != null)
                    return User;
                return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest();
            }


        }




        [HttpPost]
        [Route("UploadImage/{userID:int}")]
        public async Task<string> UploadImage(IFormFile image)
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
                    var name = "user" + requestedUser.UserID + fileType;
                    var file1 = System.IO.Path.Combine(webRoot, name);
                    using (var stream = new FileStream(file1, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                    _users.ChangeProfilePic(requestedUser.UserID, url + '/'+ name);
                }


                //    var name = img.FileName;
                //

            }
            catch (Exception e)
            {
                return $"Error: {e.Message}";
            }

            return "File uploaded!";
        }


        [HttpGet]
        [Route("getuserbytoken")]
        public ActionResult<Users> GetUserByToken()
        {
            try
            {
                var uniqueId = HttpContext.User.Identity.Name;
                Users user = _users.GetUserByEmailId(uniqueId);

                if (User != null)
                    return user;
                return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest();
            }


        }




    }
}




