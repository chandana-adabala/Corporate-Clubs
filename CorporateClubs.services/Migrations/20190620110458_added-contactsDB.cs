using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.Services.Migrations
{
    public partial class addedcontactsDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RowModifiedBy",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Conversation",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "RowModifiedBy",
                table: "Conversation",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Conversation",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Clubs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "RowModifiedBy",
                table: "Clubs",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Clubs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RowDeletedOn",
                table: "ClubMembers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "RowModifiedBy",
                table: "ClubMembers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RowModifiedOn",
                table: "ClubMembers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    ConnectedUserID = table.Column<int>(nullable: false),
                    ConnectedDate = table.Column<DateTime>(nullable: false),
                    IsFavourite = table.Column<bool>(nullable: false),
                    IsBlock = table.Column<bool>(nullable: false),
                    IsRequested = table.Column<bool>(nullable: false),
                    IsMute = table.Column<bool>(nullable: false),
                    RowCreatedOn = table.Column<DateTime>(nullable: false),
                    RowCreatedBy = table.Column<int>(nullable: true),
                    RowModifiedOn = table.Column<DateTime>(nullable: false),
                    RowModifiedBy = table.Column<int>(nullable: true),
                    RowDeletedOn = table.Column<DateTime>(nullable: false),
                    RowDeletedBy = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => new { x.UserID, x.ConnectedUserID });
                    table.UniqueConstraint("AK_Contacts_ConnectedUserID_UserID", x => new { x.ConnectedUserID, x.UserID });
                    table.ForeignKey(
                        name: "FK_Contacts_Users_ConnectedUserID",
                        column: x => x.ConnectedUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Contacts_Users_RowCreatedBy",
                        column: x => x.RowCreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Contacts_Users_RowDeletedBy",
                        column: x => x.RowDeletedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Contacts_Users_RowModifiedBy",
                        column: x => x.RowModifiedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Contacts_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RowModifiedBy",
                table: "Users",
                column: "RowModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_RowModifiedBy",
                table: "Conversation",
                column: "RowModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Clubs_RowModifiedBy",
                table: "Clubs",
                column: "RowModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ClubMembers_RowModifiedBy",
                table: "ClubMembers",
                column: "RowModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_RowCreatedBy",
                table: "Contacts",
                column: "RowCreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_RowDeletedBy",
                table: "Contacts",
                column: "RowDeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_RowModifiedBy",
                table: "Contacts",
                column: "RowModifiedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubMembers_Users_RowModifiedBy",
                table: "ClubMembers",
                column: "RowModifiedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Clubs_Users_RowModifiedBy",
                table: "Clubs",
                column: "RowModifiedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Conversation_Users_RowModifiedBy",
                table: "Conversation",
                column: "RowModifiedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_RowModifiedBy",
                table: "Users",
                column: "RowModifiedBy",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubMembers_Users_RowModifiedBy",
                table: "ClubMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Clubs_Users_RowModifiedBy",
                table: "Clubs");

            migrationBuilder.DropForeignKey(
                name: "FK_Conversation_Users_RowModifiedBy",
                table: "Conversation");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_RowModifiedBy",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Users_RowModifiedBy",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Conversation_RowModifiedBy",
                table: "Conversation");

            migrationBuilder.DropIndex(
                name: "IX_Clubs_RowModifiedBy",
                table: "Clubs");

            migrationBuilder.DropIndex(
                name: "IX_ClubMembers_RowModifiedBy",
                table: "ClubMembers");

            migrationBuilder.DropColumn(
                name: "RowModifiedBy",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RowDeletedOn",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "RowModifiedBy",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "RowModifiedOn",
                table: "Conversation");

            migrationBuilder.DropColumn(
                name: "RowDeletedOn",
                table: "Clubs");

            migrationBuilder.DropColumn(
                name: "RowModifiedBy",
                table: "Clubs");

            migrationBuilder.DropColumn(
                name: "RowModifiedOn",
                table: "Clubs");

            migrationBuilder.DropColumn(
                name: "RowDeletedOn",
                table: "ClubMembers");

            migrationBuilder.DropColumn(
                name: "RowModifiedBy",
                table: "ClubMembers");

            migrationBuilder.DropColumn(
                name: "RowModifiedOn",
                table: "ClubMembers");
        }
    }
}
