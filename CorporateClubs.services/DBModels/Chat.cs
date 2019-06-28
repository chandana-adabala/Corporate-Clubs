using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateClubs.Services.Models
{
    public class Conversation
    {
        [Key]
        [Timestamp]
        [Column(Order =1)]
        public byte[] Timestamp { get; set; }

        [Key]
        [Column(Order = 2)]
        public int UserID { get; set; }
     
        [Key]
        [Column(Order = 3)]
        public int ClubID { get; set; }
    
        [Column(TypeName = "text")]
        public string Message { get; set; }
        [Url(ErrorMessage ="Invalid Field")]
        public string Attachment { get; set; }

        public DateTime RowCreatedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowCreatedBy { get; set; }// existing user id
        public DateTime RowModifiedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowModifiedBy { get; set; }// existing user id
        public DateTime RowDeletedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowDeletedBy { get; set; }// existing user id

    }
}
