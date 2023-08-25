using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangedDatatypeOfVendorAddressIdandDeliveryAddressId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "VendorAddress",
                table: "AssignDeliveryAgents");

            migrationBuilder.AddColumn<long>(
                name: "DeliveryAddressId",
                table: "Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "VendorAddressId",
                table: "AssignDeliveryAgents",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddressId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "VendorAddressId",
                table: "AssignDeliveryAgents");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VendorAddress",
                table: "AssignDeliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
