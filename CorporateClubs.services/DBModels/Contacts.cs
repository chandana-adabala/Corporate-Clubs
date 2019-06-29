using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace CorporateClubs.Services.DBModels
{
    public class Contacts
    {
        [Key]
        [Column(Order = 1)]
        public int UserID { get; set; }// Existing user id

        [Key]
        [Column(Order = 2)]
        public int ConnectedUserID { get; set; }// Existing user id

        public DateTime ConnectedDate { get; set; }//2-11-2019 12:00:02AM
        public bool IsFavourite{ get; set; }// 1 or 0
        public bool IsBlock { get; set; }// 1 or 0
        public bool IsRequested { get; set; }// 1 or 0
        public bool IsMute { get; set; }// 1 or 0

        public DateTime RowCreatedOn { get; set; }//2-11-2019 12:00:02AM

        public int? RowCreatedBy { get; set; }// existing user id
        public DateTime RowModifiedOn { get; set; }
        public int? RowModifiedBy { get; set; }
        public DateTime RowDeletedOn { get; set; }
        public int? RowDeletedBy { get; set; }// existing user id
    }
}
