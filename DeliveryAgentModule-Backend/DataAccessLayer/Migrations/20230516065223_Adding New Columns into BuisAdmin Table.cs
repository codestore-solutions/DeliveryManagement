using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddingNewColumnsintoBuisAdminTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeliveryAgentAddress",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAgentName",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderAssignStatus",
                table: "buisnessAdmin",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "buisnessAdmin",
                keyColumn: "Id",
                keyValue: 1001,
                columns: new[] { "DeliveryAgentAddress", "DeliveryAgentName", "OrderAssignStatus", "ShippingAddress" },
                values: new object[] { null, null, 0, null });

            migrationBuilder.UpdateData(
                table: "buisnessAdmin",
                keyColumn: "Id",
                keyValue: 1002,
                columns: new[] { "DeliveryAgentAddress", "DeliveryAgentName", "OrderAssignStatus", "ShippingAddress" },
                values: new object[] { null, null, 0, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAgentAddress",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "DeliveryAgentName",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "OrderAssignStatus",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "ShippingAddress",
                table: "buisnessAdmin");
        }
    }
}
