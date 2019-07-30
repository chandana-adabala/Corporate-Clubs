using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CorporateClubs.Services.Models
{
    public class ClubMembers
    {
        [Key]
        [Column(Order =1)]
        public int ClubID { get; set; }// Existing club id


        [Key]
        [Column(Order =2)]

        public int UserID { get; set; }// Existing user id

        [StringLength(20)]
        public string Role { get; set; }// Club Owner, Admin, User
 
        public DateTime JoiningDate { get; set; }//2-11-2019 12:00:02AM
        public bool IsFavouriteClub { get; set; }// 1 or 0
        public bool IsPersonBlock { get; set; }// 1 or 0
        public bool IsRequested { get; set; }// 1 or 0
        public bool IsClubMute { get; set; }// 1 or 0
        public DateTime LastSeen { get; set; } //2-11-2019 12:00:02AM


        public DateTime RowCreatedOn { get;set; }//2-11-2019 12:00:02AM


        public int? RowCreatedBy { get; set; }// existing user id

        public DateTime? RowModifiedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowModifiedBy { get; set; }// existing user id
        public DateTime? RowDeletedOn { get; set; }//2-11-2019 12:00:02AM
        public int? RowDeletedBy { get; set; }// existing user id

    }
}
