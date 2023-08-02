using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class RemovedRelationfromKyc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kYCs_PersonalDetails_PersonalDetailId",
                table: "kYCs");

            migrationBuilder.DropIndex(
                name: "IX_kYCs_PersonalDetailId",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "PersonalDetailId",
                table: "kYCs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "PersonalDetailId",
                table: "kYCs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_kYCs_PersonalDetailId",
                table: "kYCs",
                column: "PersonalDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_kYCs_PersonalDetails_PersonalDetailId",
                table: "kYCs",
                column: "PersonalDetailId",
                principalTable: "PersonalDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
