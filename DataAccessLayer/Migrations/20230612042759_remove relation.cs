using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class removerelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignDeliveryAgents_Businesses_BusinessId",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropIndex(
                name: "IX_AssignDeliveryAgents_BusinessId",
                table: "AssignDeliveryAgents");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AssignDeliveryAgents_BusinessId",
                table: "AssignDeliveryAgents",
                column: "BusinessId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignDeliveryAgents_Businesses_BusinessId",
                table: "AssignDeliveryAgents",
                column: "BusinessId",
                principalTable: "Businesses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
