using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class addedtables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "orders");

            migrationBuilder.DropTable(
                name: "Businesses");

           
            migrationBuilder.DropPrimaryKey(
                name: "PK_orders",
                table: "orders");

            migrationBuilder.RenameTable(
                name: "orders",
                newName: "Order");

            migrationBuilder.RenameIndex(
                name: "IX_orders_AssignDeliveryAgentId",
                table: "Order",
                newName: "IX_Order_AssignDeliveryAgentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "DeliveryAgentDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    DrivingLicenseUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    AadharCardUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    PancardUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    VehicleType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VehicleModel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VehicleCompanyName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NumberPlate = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VehicleImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YourName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IFSCCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAgentDetails", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Order",
                column: "AssignDeliveryAgentId",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "Order");


            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "orders");

            migrationBuilder.RenameIndex(
                name: "IX_Order_AssignDeliveryAgentId",
                table: "orders",
                newName: "IX_orders_AssignDeliveryAgentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orders",
                table: "orders",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "deliveryAgents",
                columns: table => new
                {
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AadharCardUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    AgentGender = table.Column<int>(type: "int", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DrivingLicenseUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PancardUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    RegistrationNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    VehicleCompany = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VehicleLicensePlate = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    VehicleModel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VehicleType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_deliveryAgents", x => x.DeliveryAgentId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "orders",
                column: "AssignDeliveryAgentId",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
