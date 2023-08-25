using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationwithvehicletable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "VechicleDetails",
                newName: "AgentDetailId");

            migrationBuilder.RenameColumn(
                name: "Document",
                table: "kYCs",
                newName: "DocumentImage");

            migrationBuilder.CreateIndex(
                name: "IX_VechicleDetails_AgentDetailId",
                table: "VechicleDetails",
                column: "AgentDetailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_VechicleDetails_AgentDetails_AgentDetailId",
                table: "VechicleDetails",
                column: "AgentDetailId",
                principalTable: "AgentDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VechicleDetails_AgentDetails_AgentDetailId",
                table: "VechicleDetails");

            migrationBuilder.DropIndex(
                name: "IX_VechicleDetails_AgentDetailId",
                table: "VechicleDetails");

            migrationBuilder.RenameColumn(
                name: "AgentDetailId",
                table: "VechicleDetails",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "DocumentImage",
                table: "kYCs",
                newName: "Document");
        }
    }
}
