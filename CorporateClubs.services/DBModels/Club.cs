using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateClubs.Services.Models
{
    
    public class Club
    {
        [Key]
        public int ClubID { get; set; }
        [Required]
        [StringLength(50)]
        public string ClubTitle { get; set; }// Information Technology
        [DataType(DataType.ImageUrl,ErrorMessage ="Not a valid Image")]
        public string ProfilePic { get; set; }

        [Required]
        public string ClubType { get; set; }// Public-Open Club, Public-Closed Club, Private Club
        [ForeignKey("DeactiveBy")]
        public int? ClubCreatedBy { get; set; }// existing user id


        public int? ClubDeactiveBy { get; set; }// existing user id
        public DateTime ClubDeactiveOn { get; set; }//2-11-2019 12:00:02AM
        [StringLength(200)]
        public string Reason { get; set; }

        public DateTime CreatedOn { get; set; }//2-11-2019 12:00:02AM
        [StringLength(2000)]
        public string Description { get; set; }// About Club
  

        public DateTime RowCreatedOn { get; set; }//2-11-2019 12:00:02AM


        public int? RowCreatedBy { get; set; }// existing user id

        public DateTime? RowModifiedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowModifiedBy { get; set; }// existing user id
        public DateTime? RowDeletedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowDeletedBy { get; set; }// existing user id
    }
    }

