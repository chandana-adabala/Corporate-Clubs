using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.Services.Migrations
{
    public partial class addedcontactsDB1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ClubDeactiveOn",
                table: "Clubs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClubDeactiveOn",
                table: "Clubs");
        }
    }
}
