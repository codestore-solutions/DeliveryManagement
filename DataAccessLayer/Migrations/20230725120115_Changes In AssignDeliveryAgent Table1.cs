using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInAssignDeliveryAgentTable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AssignDeliveryAgentId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "OrdersCount",
                table: "AssignDeliveryAgents",
                newName: "orderStatus");

            migrationBuilder.AddColumn<long>(
                name: "AssignDeliveryAgentId1",
                table: "Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "DeliveryAddressId",
                table: "AssignDeliveryAgents",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<double>(
                name: "DeliveryAddressLatitude",
                table: "AssignDeliveryAgents",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DeliveryAddressLongitude",
                table: "AssignDeliveryAgents",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<long>(
                name: "OrderId",
                table: "AssignDeliveryAgents",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AssignDeliveryAgentId1",
                table: "Orders",
                column: "AssignDeliveryAgentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AssignDeliveryAgents_AssignDeliveryAgentId1",
                table: "Orders",
                column: "AssignDeliveryAgentId1",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AssignDeliveryAgents_AssignDeliveryAgentId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AssignDeliveryAgentId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AssignDeliveryAgentId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressId",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressLatitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressLongitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "AssignDeliveryAgents");

            migrationBuilder.RenameColumn(
                name: "orderStatus",
                table: "AssignDeliveryAgents",
                newName: "OrdersCount");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AssignDeliveryAgentId",
                table: "Orders",
                column: "AssignDeliveryAgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Orders",
                column: "AssignDeliveryAgentId",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
