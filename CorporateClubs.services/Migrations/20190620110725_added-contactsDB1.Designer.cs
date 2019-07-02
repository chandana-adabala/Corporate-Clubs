﻿// <auto-generated />
using System;
using CorporateClubs.Services.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CorporateClubs.Services.Migrations
{
    [DbContext(typeof(ModelContext))]
    [Migration("20190620110725_added-contactsDB1")]
    partial class addedcontactsDB1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CorporateClubs.Services.Models.Club", b =>
                {
                    b.Property<int>("ClubID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClubCreatedBy");

                    b.Property<int?>("ClubDeactiveBy");

                    b.Property<DateTime>("ClubDeactiveOn");

                    b.Property<string>("ClubTitle")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("ClubType")
                        .IsRequired();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Description")
                        .HasMaxLength(2000);

                    b.Property<string>("ProfilePic");

                    b.Property<string>("Reason")
                        .HasMaxLength(200);

                    b.Property<int?>("RowCreatedBy");

                    b.Property<DateTime>("RowCreatedOn");

                    b.Property<int?>("RowDeletedBy");

                    b.Property<DateTime>("RowDeletedOn");

                    b.Property<int?>("RowModifiedBy");

                    b.Property<DateTime>("RowModifiedOn");

                    b.HasKey("ClubID");

                    b.HasIndex("ClubCreatedBy");

                    b.HasIndex("ClubDeactiveBy");

                    b.HasIndex("RowCreatedBy");

                    b.HasIndex("RowDeletedBy");

                    b.HasIndex("RowModifiedBy");

                    b.ToTable("Clubs");
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.ClubMembers", b =>
                {
                    b.Property<int>("ClubID");

                    b.Property<int>("UserID");

                    b.Property<bool>("IsClubMute");

                    b.Property<bool>("IsFavouriteClub");

                    b.Property<bool>("IsPersonBlock");

                    b.Property<bool>("IsRequested");

                    b.Property<DateTime>("JoiningDate");

                    b.Property<DateTime>("LastSeen");

                    b.Property<string>("Role")
                        .HasMaxLength(20);

                    b.Property<int?>("RowCreatedBy");

                    b.Property<DateTime>("RowCreatedOn");

                    b.Property<int?>("RowDeletedBy");

                    b.Property<DateTime>("RowDeletedOn");

                    b.Property<int?>("RowModifiedBy");

                    b.Property<DateTime>("RowModifiedOn");

                    b.HasKey("ClubID", "UserID");

                    b.HasIndex("RowCreatedBy");

                    b.HasIndex("RowDeletedBy");

                    b.HasIndex("RowModifiedBy");

                    b.HasIndex("UserID");

                    b.ToTable("ClubMembers");
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Contacts", b =>
                {
                    b.Property<int>("UserID");

                    b.Property<int>("ConnectedUserID");

                    b.Property<DateTime>("ConnectedDate");

                    b.Property<bool>("IsBlock");

                    b.Property<bool>("IsFavourite");

                    b.Property<bool>("IsMute");

                    b.Property<bool>("IsRequested");

                    b.Property<int?>("RowCreatedBy");

                    b.Property<DateTime>("RowCreatedOn");

                    b.Property<int?>("RowDeletedBy");

                    b.Property<DateTime>("RowDeletedOn");

                    b.Property<int?>("RowModifiedBy");

                    b.Property<DateTime>("RowModifiedOn");

                    b.HasKey("UserID", "ConnectedUserID");

                    b.HasAlternateKey("ConnectedUserID", "UserID");

                    b.HasIndex("RowCreatedBy");

                    b.HasIndex("RowDeletedBy");

                    b.HasIndex("RowModifiedBy");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Conversation", b =>
                {
                    b.Property<byte[]>("Timestamp")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClubID");

                    b.Property<int>("UserID");

                    b.Property<string>("Attachment");

                    b.Property<string>("Message")
                        .HasColumnType("text");

                    b.Property<int?>("RowCreatedBy");

                    b.Property<DateTime>("RowCreatedOn");

                    b.Property<int?>("RowDeletedBy");

                    b.Property<DateTime>("RowDeletedOn");

                    b.Property<int?>("RowModifiedBy");

                    b.Property<DateTime>("RowModifiedOn");

                    b.HasKey("Timestamp", "ClubID", "UserID");

                    b.HasAlternateKey("ClubID", "Timestamp", "UserID");

                    b.HasIndex("RowCreatedBy");

                    b.HasIndex("RowDeletedBy");

                    b.HasIndex("RowModifiedBy");

                    b.HasIndex("UserID");

                    b.ToTable("Conversation");
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Users", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("About")
                        .HasMaxLength(100);

                    b.Property<string>("Address")
                        .HasMaxLength(200);

                    b.Property<string>("BloodGroup")
                        .HasMaxLength(5);

                    b.Property<DateTime>("DOB");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Gender");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsContactHide");

                    b.Property<bool>("IsProfSumHIde");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<DateTime>("LastSeen");

                    b.Property<DateTime>("LoginCreated");

                    b.Property<string>("MartialStatus");

                    b.Property<string>("MiddleName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("MobileNumber")
                        .IsRequired()
                        .HasColumnType("varchar(13)");

                    b.Property<string>("ProfSum")
                        .HasMaxLength(500);

                    b.Property<string>("ProfilePic");

                    b.Property<string>("Role")
                        .HasMaxLength(5);

                    b.Property<int?>("RowCreatedBy");

                    b.Property<DateTime>("RowCreatedOn");

                    b.Property<int?>("RowDeletedBy");

                    b.Property<int?>("RowModifiedBy");

                    b.HasKey("UserID");

                    b.HasIndex("RowCreatedBy");

                    b.HasIndex("RowDeletedBy");

                    b.HasIndex("RowModifiedBy");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Club", b =>
                {
                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("ClubCreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("ClubDeactiveBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowCreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowDeletedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowModifiedBy")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.ClubMembers", b =>
                {
                    b.HasOne("CorporateClubs.Services.Models.Club")
                        .WithMany()
                        .HasForeignKey("ClubID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowCreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowDeletedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowModifiedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Contacts", b =>
                {
                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("ConnectedUserID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowCreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowDeletedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowModifiedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Conversation", b =>
                {
                    b.HasOne("CorporateClubs.Services.Models.Club")
                        .WithMany()
                        .HasForeignKey("ClubID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowCreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowDeletedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowModifiedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CorporateClubs.Services.Models.Users", b =>
                {
                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowCreatedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowDeletedBy")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CorporateClubs.Services.Models.Users")
                        .WithMany()
                        .HasForeignKey("RowModifiedBy")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
