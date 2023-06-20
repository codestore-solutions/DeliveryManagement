using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class updatedassigndeliveryagenttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<double>(
                name: "PickupLatitude",
                table: "AssignDeliveryAgents",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PickupLongitude",
                table: "AssignDeliveryAgents",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddressLatitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressLongitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "PickupLatitude",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "PickupLongitude",
                table: "AssignDeliveryAgents");
        }
    }
}
