
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CorporateClubs.Services.DBModels
{
    public class ModelContext:DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<ClubMembers> ClubMembers { get; set; }
        public DbSet<Conversation> Conversation { get; set; }
        public DbSet<Contacts> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=Intdev-pc;Database=VisionCorporateClubs;User ID=Intern;Password=P@ssw0rd;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClubMembers>()
                .HasKey(o => new { o.ClubID, o.UserID })
                ;
            modelBuilder.Entity<Contacts>()
                .HasKey(o => new { o.UserID, o.ConnectedUserID })
                ;
            modelBuilder.Entity<Conversation>()
                .HasKey(o => new { o.Timestamp, o.ClubID, o.UserID })
                ;

            modelBuilder.Entity<Conversation>()
                .HasOne(typeof(Users))
                .WithMany()
                .HasForeignKey("UserID")
                ;

            modelBuilder.Entity<Conversation>()
                .HasOne(typeof(Club))
                .WithMany()
                .HasForeignKey("ClubID")
                ;

            modelBuilder.Entity<ClubMembers>()
                .HasOne(typeof(Users))
                .WithMany()
                .HasForeignKey("UserID")
                ;

            modelBuilder.Entity<ClubMembers>()
                .HasOne(typeof(Club))
                .WithMany()
                .HasForeignKey("ClubID")
                ;
            modelBuilder.Entity<Contacts>()
                .HasOne(typeof(Users))
                .WithMany()
                .HasForeignKey("UserID")
                ;

            modelBuilder.Entity<Contacts>()
                .HasOne(typeof(Users))
                .WithMany()
                .HasForeignKey("ConnectedUserID")
                ;


            modelBuilder.Entity<Conversation>()
                .Property(p => p.Timestamp)
                .ValueGeneratedOnAdd()
                ;


            modelBuilder.Entity<Users>()
                .HasOne(typeof(Users))
                .WithMany()
                .HasForeignKey("RowCreatedBy")
                .OnDelete(DeleteBehavior.Restrict)
                ;

            modelBuilder.Entity<Users>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowDeletedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Club>()
              .HasOne(typeof(Users))
              .WithMany()
              .HasForeignKey("RowCreatedBy")
              .OnDelete(DeleteBehavior.Restrict)
              ;

            modelBuilder.Entity<Club>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowDeletedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<ClubMembers>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowCreatedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;

            modelBuilder.Entity<ClubMembers>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowDeletedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Conversation>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowCreatedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;

            modelBuilder.Entity<Conversation>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowDeletedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Club>()
              .HasOne(typeof(Users))
              .WithMany()
              .HasForeignKey("ClubCreatedBy")
              .OnDelete(DeleteBehavior.Restrict)
              ;

            modelBuilder.Entity<Club>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("ClubDeactiveBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Contacts>()
                  .HasOne(typeof(Users))
                  .WithMany()
                  .HasForeignKey("RowCreatedBy")
                  .OnDelete(DeleteBehavior.Restrict)
                  ;

            modelBuilder.Entity<Contacts>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowDeletedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Contacts>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowModifiedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Conversation>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowModifiedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<ClubMembers>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowModifiedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Club>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowModifiedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;
            modelBuilder.Entity<Users>()
               .HasOne(typeof(Users))
               .WithMany()
               .HasForeignKey("RowModifiedBy")
               .OnDelete(DeleteBehavior.Restrict)
               ;

        }


    }
}
