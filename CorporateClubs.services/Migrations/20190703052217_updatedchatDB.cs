using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.services.Migrations
{
    public partial class updatedchatDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Conversation_ClubID_Timestamp_UserID",
                table: "Conversation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Conversation",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Conversation");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "PostedOn",
                table: "Conversation",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Conversation_ClubID_PostedOn_UserID",
                table: "Conversation",
                columns: new[] { "ClubID", "PostedOn", "UserID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Conversation",
                table: "Conversation",
                columns: new[] { "PostedOn", "ClubID", "UserID" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Conversation_ClubID_PostedOn_UserID",
                table: "Conversation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Conversation",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "PostedOn",
                table: "Conversation");

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Conversation",
                nullable: false,
                defaultValue: new byte[] {  });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Conversation_ClubID_Timestamp_UserID",
                table: "Conversation",
                columns: new[] { "ClubID", "Timestamp", "UserID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Conversation",
                table: "Conversation",
                columns: new[] { "Timestamp", "ClubID", "UserID" });
        }
    }
}
