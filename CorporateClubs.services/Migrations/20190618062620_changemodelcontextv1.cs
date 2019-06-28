using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.Services.Migrations
{
    public partial class changemodelcontextv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubMembers_Users_RowCreatedByUserID",
                table: "ClubMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubMembers_Users_RowDeletedByUserID",
                table: "ClubMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversation_Users_RowCreatedByUserID",
                table: "Conversation");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversation_Users_RowDeletedByUserID",
                table: "Conversation");

            migrationBuilder.RenameColumn(
                name: "RowDeletedByUserID",
                table: "Conversation",
                newName: "RowDeletedBy");

            migrationBuilder.RenameColumn(
                name: "RowCreatedByUserID",
                table: "Conversation",
                newName: "RowCreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Conversation_RowDeletedByUserID",
                table: "Conversation",
                newName: "IX_Conversation_RowDeletedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Conversation_RowCreatedByUserID",
                table: "Conversation",
                newName: "IX_Conversation_RowCreatedBy");

            migrationBuilder.RenameColumn(
                name: "RowDeletedByUserID",
                table: "ClubMembers",
                newName: "RowDeletedBy");

            migrationBuilder.RenameColumn(
                name: "RowCreatedByUserID",
                table: "ClubMembers",
                newName: "RowCreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_ClubMembers_RowDeletedByUserID",
                table: "ClubMembers",
                newName: "IX_ClubMembers_RowDeletedBy");

            migrationBuilder.RenameIndex(
                name: "IX_ClubMembers_RowCreatedByUserID",
                table: "ClubMembers",
                newName: "IX_ClubMembers_RowCreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubMembers_Users_RowCreatedBy",
                table: "ClubMembers",
                column: "RowCreatedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClubMembers_Users_RowDeletedBy",
                table: "ClubMembers",
                column: "RowDeletedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_Users_RowCreatedBy",
                table: "Conversation",
                column: "RowCreatedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_Users_RowDeletedBy",
                table: "Conversation",
                column: "RowDeletedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubMembers_Users_RowCreatedBy",
                table: "ClubMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubMembers_Users_RowDeletedBy",
                table: "ClubMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversation_Users_RowCreatedBy",
                table: "Conversation");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversation_Users_RowDeletedBy",
                table: "Conversation");

            migrationBuilder.RenameColumn(
                name: "RowDeletedBy",
                table: "Conversation",
                newName: "RowDeletedByUserID");

            migrationBuilder.RenameColumn(
                name: "RowCreatedBy",
                table: "Conversation",
                newName: "RowCreatedByUserID");

            migrationBuilder.RenameIndex(
                name: "IX_Conversation_RowDeletedBy",
                table: "Conversation",
                newName: "IX_Conversation_RowDeletedByUserID");

            migrationBuilder.RenameIndex(
                name: "IX_Conversation_RowCreatedBy",
                table: "Conversation",
                newName: "IX_Conversation_RowCreatedByUserID");

            migrationBuilder.RenameColumn(
                name: "RowDeletedBy",
                table: "ClubMembers",
                newName: "RowDeletedByUserID");

            migrationBuilder.RenameColumn(
                name: "RowCreatedBy",
                table: "ClubMembers",
                newName: "RowCreatedByUserID");

            migrationBuilder.RenameIndex(
                name: "IX_ClubMembers_RowDeletedBy",
                table: "ClubMembers",
                newName: "IX_ClubMembers_RowDeletedByUserID");

            migrationBuilder.RenameIndex(
                name: "IX_ClubMembers_RowCreatedBy",
                table: "ClubMembers",
                newName: "IX_ClubMembers_RowCreatedByUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubMembers_Users_RowCreatedByUserID",
                table: "ClubMembers",
                column: "RowCreatedByUserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClubMembers_Users_RowDeletedByUserID",
                table: "ClubMembers",
                column: "RowDeletedByUserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_Users_RowCreatedByUserID",
                table: "Conversation",
                column: "RowCreatedByUserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_Users_RowDeletedByUserID",
                table: "Conversation",
                column: "RowDeletedByUserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
