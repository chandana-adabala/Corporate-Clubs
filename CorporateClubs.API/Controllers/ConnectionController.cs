using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CorporateClubs.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CorporateClubs.Services.Models;
using CorporateClubs.Models.Models;
using Microsoft.AspNetCore.Authorization;

namespace CorporateClubs.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {

        private readonly IConnections _connections;
        private readonly IUsers _users;


        public ConnectionController(IConnections connections, IUsers users)
        {
            _connections = connections;
            _users = users;

        }
        [HttpGet]
        [Route("getmycontacts")]
        public ActionResult<List<FrontEndContacts>> GetUserContacts()
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    return _connections.GetMyContacts(requestedUser.UserID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getmysuggestions")]
        public ActionResult<List<FrontEndContacts>> GetUserSuggestions()
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    return _connections.GetMySuggestions(requestedUser.UserID);
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("addcontact/{newContactUserID:int}")]
        public ActionResult AddNewContact(int newContactUserID)
        {

            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    if (_connections.AddContact( newContactUserID, requestedUser.UserID))
                        return Ok();
                return BadRequest();

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }







    }
}