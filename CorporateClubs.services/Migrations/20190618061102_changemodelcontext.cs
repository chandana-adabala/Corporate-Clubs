using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.Services.Migrations
{
    public partial class changemodelcontext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DisplayName = table.Column<string>(maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    MobileNumber = table.Column<string>(type: "varchar(13)", nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Role = table.Column<string>(maxLength: 5, nullable: true),
                    Address = table.Column<string>(maxLength: 200, nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    MartialStatus = table.Column<string>(nullable: true),
                    BloodGroup = table.Column<string>(maxLength: 5, nullable: true),
                    DOB = table.Column<DateTime>(nullable: false),
                    LoginCreated = table.Column<DateTime>(nullable: false),
                    LastSeen = table.Column<DateTime>(nullable: false),
                    About = table.Column<string>(maxLength: 100, nullable: true),
                    ProfSum = table.Column<string>(maxLength: 500, nullable: true),
                    ProfilePic = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsContactHide = table.Column<bool>(nullable: false),
                    IsProfSumHIde = table.Column<bool>(nullable: false),
                    RowCreatedOn = table.Column<DateTime>(nullable: false),
                    RowCreatedBy = table.Column<int>(nullable: true),
                    RowDeletedBy = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Users_RowCreatedBy",
                        column: x => x.RowCreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Users_Users_RowDeletedBy",
                        column: x => x.RowDeletedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Clubs",
                columns: table => new
                {
                    ClubID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClubTitle = table.Column<string>(maxLength: 50, nullable: false),
                    ProfilePic = table.Column<string>(nullable: true),
                    ClubType = table.Column<string>(nullable: false),
                    ClubCreatedBy = table.Column<int>(nullable: true),
                    ClubDeactiveBy = table.Column<int>(nullable: true),
                    Reason = table.Column<string>(maxLength: 200, nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 2000, nullable: true),
                    RowCreatedOn = table.Column<DateTime>(nullable: false),
                    RowCreatedBy = table.Column<int>(nullable: true),
                    RowDeletedBy = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clubs", x => x.ClubID);
                    table.ForeignKey(
                        name: "FK_Clubs_Users_ClubCreatedBy",
                        column: x => x.ClubCreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Clubs_Users_ClubDeactiveBy",
                        column: x => x.ClubDeactiveBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Clubs_Users_RowCreatedBy",
                        column: x => x.RowCreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Clubs_Users_RowDeletedBy",
                        column: x => x.RowDeletedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ClubMembers",
                columns: table => new
                {
                    ClubID = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    Role = table.Column<string>(maxLength: 20, nullable: true),
                    JoiningDate = table.Column<DateTime>(nullable: false),
                    IsFavouriteClub = table.Column<bool>(nullable: false),
                    IsPersonBlock = table.Column<bool>(nullable: false),
                    IsRequested = table.Column<bool>(nullable: false),
                    IsClubMute = table.Column<bool>(nullable: false),
                    LastSeen = table.Column<DateTime>(nullable: false),
                    RowCreatedOn = table.Column<DateTime>(nullable: false),
                    RowCreatedByUserID = table.Column<int>(nullable: true),
                    RowDeletedByUserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClubMembers", x => new { x.ClubID, x.UserID });
                    table.ForeignKey(
                        name: "FK_ClubMembers_Clubs_ClubID",
                        column: x => x.ClubID,
                        principalTable: "Clubs",
                        principalColumn: "ClubID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ClubMembers_Users_RowCreatedByUserID",
                        column: x => x.RowCreatedByUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ClubMembers_Users_RowDeletedByUserID",
                        column: x => x.RowDeletedByUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ClubMembers_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Conversation",
                columns: table => new
                {
                    Timestamp = table.Column<byte[]>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    ClubID = table.Column<int>(nullable: false),
                    Message = table.Column<string>(type: "text", nullable: true),
                    Attachment = table.Column<string>(nullable: true),
                    RowCreatedOn = table.Column<DateTime>(nullable: false),
                    RowCreatedByUserID = table.Column<int>(nullable: true),
                    RowDeletedByUserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversation", x => new { x.Timestamp, x.ClubID, x.UserID });
                    table.UniqueConstraint("AK_Conversation_ClubID_Timestamp_UserID", x => new { x.ClubID, x.Timestamp, x.UserID });
                    table.ForeignKey(
                        name: "FK_Conversation_Clubs_ClubID",
                        column: x => x.ClubID,
                        principalTable: "Clubs",
                        principalColumn: "ClubID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Conversation_Users_RowCreatedByUserID",
                        column: x => x.RowCreatedByUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Conversation_Users_RowDeletedByUserID",
                        column: x => x.RowDeletedByUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Conversation_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);

                });

            migrationBuilder.CreateIndex(
                name: "IX_ClubMembers_RowCreatedByUserID",
                table: "ClubMembers",
                column: "RowCreatedByUserID");

            migrationBuilder.CreateIndex(
                name: "IX_ClubMembers_RowDeletedByUserID",
                table: "ClubMembers",
                column: "RowDeletedByUserID");

            migrationBuilder.CreateIndex(
                name: "IX_ClubMembers_UserID",
                table: "ClubMembers",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_ClubCreatedBy",
                table: "Clubs",
                column: "ClubCreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_ClubDeactiveBy",
                table: "Clubs",
                column: "ClubDeactiveBy");

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_RowCreatedBy",
                table: "Clubs",
                column: "RowCreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_RowDeletedBy",
                table: "Clubs",
                column: "RowDeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_RowCreatedByUserID",
                table: "Conversation",
                column: "RowCreatedByUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_RowDeletedByUserID",
                table: "Conversation",
                column: "RowDeletedByUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_UserID",
                table: "Conversation",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RowCreatedBy",
                table: "Users",
                column: "RowCreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RowDeletedBy",
                table: "Users",
                column: "RowDeletedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClubMembers");

            migrationBuilder.DropTable(
                name: "Conversation");

            migrationBuilder.DropTable(
                name: "Clubs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
