using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationbetweenKYCandAgentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_kYCs_AgentId",
                table: "kYCs",
                column: "AgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_kYCs_Agents_AgentId",
                table: "kYCs",
                column: "AgentId",
                principalTable: "Agents",
                principalColumn: "AgentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kYCs_Agents_AgentId",
                table: "kYCs");

            migrationBuilder.DropIndex(
                name: "IX_kYCs_AgentId",
                table: "kYCs");
        }
    }
}
