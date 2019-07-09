using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CorporateClubs.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using CorporateClubs.Services.Interfaces;

namespace CorporateClubs.API.Controllers
{
    [Authorize]
    [EnableCors("allowmyorgin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private readonly IConversation _conversation;
        private readonly IClubs _clubs;
        private readonly IUsers _users;
        public ConversationsController(IClubs clubs, IUsers users, IConversation conversation)
        {
            _clubs = clubs;
            _users = users;
            _conversation = conversation;
        }

        [HttpGet]
        [Route("getallmessagesofclub/{clubID:int}")]
        public ActionResult<List<Conversation>> GetAllMessagesOfClub(int clubID)
        {
            var uniqueId = HttpContext.User.Identity.Name;
            Users requestedUser = _users.GetUserByEmailId(uniqueId);
            try
            {
                if (_users.IsUser(requestedUser.UserID) == true)
                    
                    return _conversation.GetAllMessagesOfClub(clubID);
                else
                    return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
