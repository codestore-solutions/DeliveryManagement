using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInAssignDeliveryAgentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddressLatitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressLongitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "DeliveryAddressLatitude",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DeliveryAddressLongitude",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "VendorAddress",
                table: "AssignDeliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressLatitude",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressLongitude",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "VendorAddress",
                table: "AssignDeliveryAgents");

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
        }
    }
}
