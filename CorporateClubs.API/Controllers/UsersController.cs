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

namespace CorporateClubs.API.Controllers
{
    public class Data
    {
        public int UserID;
        public int ClubID;
        public int AdminID;
    }


    public class FileUploadViewModel
    {
        public IFormFile File { get; set; }
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

        [EnableCors("allowmyorgin")]
        [Route("api/[controller]")]
        [ApiController]
        public class UsersController : ControllerBase
        {
        private readonly IUsers _users;
        private readonly IClubs _clubs;
        private IHostingEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UsersController(IUsers users,IClubs clubs, IHostingEnvironment env)
        {
            _users = users;
            _clubs = clubs;
            _env = env;

        }
       
      
        // GET: api/Users/GetAllUsersByClub/clubID

        [HttpGet]
        [Route("getallusersbyclub/{requestID:int}/{clubID:int}")]
        public ActionResult<List<ClubMembers>> GetAllUsersByClub(int requestID, int clubID)
        {
            if (_users.IsUser(requestID))
            {
                return _users.GetAllUsersByClub(clubID);
            }
            return Unauthorized();
        }

        // GET: api/Users/GetAllRequestedUsers/clubID
        [HttpGet]
        [Route("getallrequestedusers/{requestID:int}/{clubID:int}")]
        public ActionResult<List<ClubMembers>> GetAllRequestedUsers(int requestID, int clubID)
        {
            if (_users.IsUser(requestID))
            {
                if (_users.GetAllRequestedUsers(clubID).Count() != 0)
                    return _users.GetAllRequestedUsers(clubID);
                return NoContent();
            }
            return Unauthorized();
        }

        // GET: api/Users/GetAllUsers
        [HttpGet]
        [Route("getallusers/{requestID:int}")]
        public ActionResult<List<Users>> GetAllUsers(int requestID)
        {
            if (_users.IsUser(requestID))
            {
                if (_users.GetAllUsers().Count() != 0)
                    return _users.GetAllUsers();
                return NotFound();
            }
            return Unauthorized();
        }

        // GET: api/Users/Delete/userID
        [HttpPut]
        [Route("deleteuser/{requestID:int}")]
        public ActionResult DeleteUser(int requestID, userTypechangeReason idReason)
        {
            if (_users.IsAdmin(requestID))
            {
                if (_users.DeleteUser(idReason.userID, requestID,idReason.reason))
                    return Ok();
                return NotFound();

            }
            return Unauthorized();
        }

        // GET: api/Users/DeactiveUser/userID
        [HttpPut]
        [Route("deactivateuser/{requestID:int}")]
        public ActionResult DeactiveUser(int requestID,userTypechangeReason idReason)
        {
            if (_users.IsAdmin(requestID))
            {
                if (_users.DeactiveUser(idReason.userID,idReason.reason))
                    return Ok();
                return NotFound();
            }
            return Unauthorized();
        }


        [HttpPost]
        [Route("AddUser/{requestID:int}")]
        public ActionResult<String> AddUser([FromBody]NewUser userDetails, int requestID)
        {
            if (_users.IsAdmin(requestID))
            {
                int userID = _users.AddUser(userDetails.user);
                foreach(int i in userDetails.clubs)
                {
                    _clubs.Addmember(i, userID, requestID);
                }
                if (userID != 0)
                    return userID.ToString();
                else
                    BadRequest();
            }
            return Unauthorized();
        }


        [HttpPut]
        [Route("changepersonaldetails")]
        public ActionResult ChangePersonalDetails([FromBody]Users user)
        {
            if (_users.Change_Personal_Details(user.UserID, user.FirstName, user.LastName, user.Gender, user.MartialStatus, user.About, user.MiddleName, user.DOB, user.BloodGroup) == true)
                return Ok();
            else
                return BadRequest();
        }


        [HttpPut]
        [Route("changecontactdetails")]
        public ActionResult ChangeContactDetails([FromBody] Users user)
        {
            if (_users.Change_Contact_details(user.UserID, user.MobileNumber, user.Email, user.Address) == true)
                return Ok();
            else
                return BadRequest();
        }


        [HttpPut]
        [Route("changeprofessionalsummary")]
        public ActionResult ChangeProfessionalSummary([FromBody] Users u)
        {
            if (_users.Change_professional_Summary(u.UserID, u.ProfSum) == true)
                return Ok();
            else
                return BadRequest();
        }


        [HttpPut]
        [Route("blockuser/{requestID:int}/{userID:int}/{clubID:int}")]
        public ActionResult BlockUser(int requestID, int userID, int clubID)
        {
            if (_users.IsAdmin(requestID))
                if (_users.BlockUser(userID, clubID) == true)
                    return Ok();
                else
                    return BadRequest();


            return Unauthorized();
        }



        [HttpPut]
        [Route("reactivateuser/{requestID:int}")]
        public ActionResult ReactivateUser(int requestID, userTypechangeReason idReason)
        {
            if (_users.IsAdmin(requestID))
                if (_users.ReactiveUser(idReason.userID,idReason.reason) == true)
                    return Ok();
                else
                    return BadRequest();


            return Unauthorized();
        }

        [HttpPut]
        [Route("unblockuser/{requestID:int}/{userID:int}/{clubID:int}")]
        public ActionResult UnBlockUser(int requestID, int userID, int clubID)
        {
            if (_users.IsAdmin(requestID))
                if (_users.UnblockUser(userID, clubID) == true)
                    return Ok();
                else
                    return BadRequest();


            return Unauthorized();
        }


        [HttpGet]
        [Route("getuserbyid/{userID:int}")]
        public ActionResult<Users> GetUserById(int userID)
        {
            Users User = _users.GetUserById(userID);
            if (User != null)
                return User;
            return BadRequest();


        }




        [HttpPost]
        [Route("api/UploadImage/{userID:int}")]
        public async Task<string> UploadImage(IFormFile image,int userID)
        {
            var webRoot = _env.WebRootPath;
           
           

            try
            {
                
                    if (image.Length > 0)
                    {
                    var url = "http://localhost:3333/images";
                        var name = image.FileName;
                        var file1 = System.IO.Path.Combine(webRoot, name);
                        using (var stream = new FileStream(file1, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }
                    _users.ChangeProfilePic(userID,url+'/'+name);
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


//        foreach (var file in files) {
//        if (file.Length > 0) {
//            using (var reader = new StreamReader(file.OpenReadStream()))
//            {  
//               var fileContent = reader.ReadToEnd();
//    }
//}
//     }

        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { count = files.Count, size, filePath });
        }









        //[HttpPost]
        //[RequestSizeLimit(40000000)]
        //[Route("uploadFile")]
        //public async Task<IActionResult> UploadFileAsync(IFormFile File)
        //{
        //    var file = File;

        //    if (file.Length > 0)
        //    {
        //        string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\images");
        //        using (var fs = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
        //        {
        //            await file.CopyToAsync(fs);
        //        }
        //        return Ok();
        //    }
        //    return BadRequest();

        //    //var FileName = File.FileName;
        //    //var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", FileName);
        //    //using (var FileStream = new FileStream(path, FileMode.Create))
        //    //{
        //    //    File.CopyTo(FileStream);
        //    //}

        //}


    }
}



        //[HttpPost]
        //[Route("UploadFiles/{userID:int}")]
        //public  bool Upload(int userID)
        //*/*/
        //    try
        //    {


        //    var s = _httpContextAccessor.HttpContext.Request.GetBufferlessInputStream(true);
        //    var fileuploadPath = ConfigurationManager.AppSettings["FileUploadLocation"];

        //    var provider = new MultipartFormDataStreamProvider(fileuploadPath);
        //    var content = new StreamContent(HttpContext.Current.Request.GetBufferlessInputStream(true));
        //    foreach (var header in Request.Content.Headers)
        //    {
        //        content.Headers.TryAddWithoutValidation(header.Key, header.Value);
        //    }

        //    await content.ReadAsMultipartAsync(provider);
        //  return true;
        //}
        //catch (Exception)
        //{
        //    return false;
        //}

//    }
//    }
//}
