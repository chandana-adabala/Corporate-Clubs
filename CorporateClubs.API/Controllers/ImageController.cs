using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CorporateClubs.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        [HttpPost]
        [Route("uploadFile")]
        public void UploadFile(IFormFileCollection Files)
        {
            foreach (var File in Files)
            {
                var FileName = File.FileName;
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", FileName);
                using (var FileStream = new FileStream(path, FileMode.Create))
                {
                    File.CopyTo(FileStream);
                }
            }

        }
    }
}
