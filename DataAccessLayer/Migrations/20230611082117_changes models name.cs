using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class changesmodelsname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Businesses",
                newName: "BusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignDeliveryAgents_BusinessId",
                table: "AssignDeliveryAgents",
                column: "BusinessId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignDeliveryAgents_Businesses_BusinessId",
                table: "AssignDeliveryAgents",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "BusinessId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignDeliveryAgents_Businesses_BusinessId",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropIndex(
                name: "IX_AssignDeliveryAgents_BusinessId",
                table: "AssignDeliveryAgents");

            migrationBuilder.RenameColumn(
                name: "BusinessId",
                table: "Businesses",
                newName: "Id");
        }
    }
}
