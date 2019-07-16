using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.services.Migrations
{
    public partial class changedattachments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Attachment",
                table: "Conversation",
                newName: "AttachmentUrls");

            migrationBuilder.AddColumn<string>(
                name: "AttachmentNames",
                table: "Conversation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentNames",
                table: "Conversation");

            migrationBuilder.RenameColumn(
                name: "AttachmentUrls",
                table: "Conversation",
                newName: "Attachment");
        }
    }
}
