using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MySql.Data.EntityFrameworkCore.DataAnnotations;

namespace CorporateClubs.Services.Models
{
    public class Conversation
    {
        [Key]
        [Column(Order =1)]
        public DateTimeOffset PostedOn { get; set; }

        [Key]
        [Column(Order = 2)]
        public int UserID { get; set; }
     
        [Key]
        [Column(Order = 3)]
        public int ClubID { get; set; }
    
        
        [MySqlCharset("utf8")]
        public string Message { get; set; }
        
        public string AttachmentUrls { get; set; }
        public string AttachmentNames { get; set; }

        public DateTime? RowCreatedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowCreatedBy { get; set; }// existing user id
        public DateTime? RowModifiedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowModifiedBy { get; set; }// existing user id
        public DateTime? RowDeletedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowDeletedBy { get; set; }// existing user id

    }
}
