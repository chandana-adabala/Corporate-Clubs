using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.services.Migrations
{
    public partial class makeOptioanlArguments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Users",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Conversation",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Conversation",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowCreatedOn",
                table: "Conversation",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowCreatedOn",
                table: "Contacts",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Clubs",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Clubs",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowModifiedOn",
                table: "ClubMembers",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowDeletedOn",
                table: "ClubMembers",
                nullable: true,
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowDeletedOn",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RowModifiedOn",
                table: "Users");

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Conversation",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Conversation",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowCreatedOn",
                table: "Conversation",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowCreatedOn",
                table: "Contacts",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowModifiedOn",
                table: "Clubs",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowDeletedOn",
                table: "Clubs",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowModifiedOn",
                table: "ClubMembers",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "RowDeletedOn",
                table: "ClubMembers",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
