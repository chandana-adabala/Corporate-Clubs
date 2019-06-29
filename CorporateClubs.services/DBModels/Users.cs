using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace CorporateClubs.Services.DBModels
{


    public class Users
    {
        [Key]
        public int UserID { get; set; }//1
        [StringLength(50)]
        [Required]
        public string DisplayName { get; set; }//giraffi_2
        [StringLength(50)]
        [Required]
        public string FirstName { get; set; }//John
        [StringLength(50)]
        [Required]
        public string MiddleName { get; set; }//Yung
        [StringLength(50)]
        [Required]
        public string LastName { get; set; }//Rong

        [Required]
        [Column(TypeName ="varchar(13)")]
        
        public string MobileNumber { get; set; }//+917988967890
        [Required]
        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address.")]
        public string Email { get; set; }//abc@outlook.com

        [StringLength(5)]
        public string Role { get; set; }// Admin,User

        [StringLength (maximumLength:200)]
        public string Address { get; set; }


        public string Gender { get; set; }// Female,Male

        public string MartialStatus { get; set; }// Married,UnMarried

        [StringLength(5)]
        public string BloodGroup { get; set; }//O+,A+...

        public DateTime DOB { get; set; }//2-11-2019 12:00:02AM

        public DateTime LoginCreated { get; set; }// 2-11-2019 12:00:02AM


        public DateTime LastSeen { get; set; }//  2-11-2019 12:00:02AM

        [StringLength(maximumLength: 100)]
        public string About{get; set;}// I am happy

        [StringLength(maximumLength:500)]
        public string ProfSum { get; set; }// I am a Full Stack developer

        [DataType(DataType.ImageUrl)]
        public string ProfilePic { get; set; }//..

        public bool IsActive { get; set; }// 1 or 0
  
        public bool IsContactHide { get; set; }// 1 or 0
 
        public bool IsProfSumHIde { get; set; }// 1 or 0

        public DateTime RowCreatedOn{get;set; }//  2-11-2019 12:00:02AM



        public int? RowCreatedBy{get;set;}// existing user id


        public int? RowDeletedBy {get;set; }// existing user id

        public static implicit operator Users(int v)
        {
            throw new NotImplementedException();
        }
    }
}
