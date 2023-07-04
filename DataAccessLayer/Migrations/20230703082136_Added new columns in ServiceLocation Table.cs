using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddednewcolumnsinServiceLocationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_serviceLocations",
                table: "serviceLocations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_buisnessAdmin",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "serviceLocations");

            migrationBuilder.DropColumn(
                name: "OrderAssignStatus",
                table: "serviceLocations");

            migrationBuilder.RenameTable(
                name: "serviceLocations",
                newName: "ServiceLocations");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "Orders");

            migrationBuilder.RenameTable(
                name: "buisnessAdmin",
                newName: "BusinessAdmin");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ServiceLocations",
                newName: "ServiceLocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_AssignDeliveryAgentId",
                table: "Orders",
                newName: "IX_Orders_AssignDeliveryAgentId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "ServiceLocations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "ServiceLocations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LocationName",
                table: "ServiceLocations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "ServiceLocations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceLocations",
                table: "ServiceLocations",
                column: "ServiceLocationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BusinessAdmin",
                table: "BusinessAdmin",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "SelectedDay",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SelectDay = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceLocationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectedDay", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelectedDay_ServiceLocations_ServiceLocationId",
                        column: x => x.ServiceLocationId,
                        principalTable: "ServiceLocations",
                        principalColumn: "ServiceLocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SelectedDay_ServiceLocationId",
                table: "SelectedDay",
                column: "ServiceLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Orders",
                column: "AssignDeliveryAgentId",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "SelectedDay");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceLocations",
                table: "ServiceLocations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BusinessAdmin",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "LocationName",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "ServiceLocations");

            migrationBuilder.RenameTable(
                name: "ServiceLocations",
                newName: "serviceLocations");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Order");

            migrationBuilder.RenameTable(
                name: "BusinessAdmin",
                newName: "buisnessAdmin");

            migrationBuilder.RenameColumn(
                name: "ServiceLocationId",
                table: "serviceLocations",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_AssignDeliveryAgentId",
                table: "Order",
                newName: "IX_Order_AssignDeliveryAgentId");

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "serviceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderAssignStatus",
                table: "serviceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_serviceLocations",
                table: "serviceLocations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_buisnessAdmin",
                table: "buisnessAdmin",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Order",
                column: "AssignDeliveryAgentId",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
