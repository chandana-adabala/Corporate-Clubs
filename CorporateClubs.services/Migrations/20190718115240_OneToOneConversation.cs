using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CorporateClubs.services.Migrations
{
    public partial class OneToOneConversation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OneToOneConversation",
                columns: table => new
                {
                    PostedOn = table.Column<DateTimeOffset>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    ConnectedUserID = table.Column<int>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    AttachmentUrls = table.Column<string>(nullable: true),
                    AttachmentNames = table.Column<string>(nullable: true),
                    RowCreatedOn = table.Column<DateTime>(nullable: true),
                    RowCreatedBy = table.Column<int>(nullable: true),
                    RowModifiedOn = table.Column<DateTime>(nullable: true),
                    RowModifiedBy = table.Column<int>(nullable: true),
                    RowDeletedOn = table.Column<DateTime>(nullable: true),
                    RowDeletedBy = table.Column<int>(nullable: true),
                    ClubID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OneToOneConversation", x => new { x.PostedOn, x.ConnectedUserID, x.UserID });
                    table.UniqueConstraint("AK_OneToOneConversation_ConnectedUserID_PostedOn_UserID", x => new { x.ConnectedUserID, x.PostedOn, x.UserID });
                    table.ForeignKey(
                        name: "FK_OneToOneConversation_Clubs_ClubID",
                        column: x => x.ClubID,
                        principalTable: "Clubs",
                        principalColumn: "ClubID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OneToOneConversation_Users_RowCreatedBy",
                        column: x => x.RowCreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OneToOneConversation_Users_RowDeletedBy",
                        column: x => x.RowDeletedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OneToOneConversation_Users_RowModifiedBy",
                        column: x => x.RowModifiedBy,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OneToOneConversation_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OneToOneConversation_ClubID",
                table: "OneToOneConversation",
                column: "ClubID");

            migrationBuilder.CreateIndex(
                name: "IX_OneToOneConversation_RowCreatedBy",
                table: "OneToOneConversation",
                column: "RowCreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_OneToOneConversation_RowDeletedBy",
                table: "OneToOneConversation",
                column: "RowDeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_OneToOneConversation_RowModifiedBy",
                table: "OneToOneConversation",
                column: "RowModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_OneToOneConversation_UserID",
                table: "OneToOneConversation",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OneToOneConversation");
        }
    }
}
