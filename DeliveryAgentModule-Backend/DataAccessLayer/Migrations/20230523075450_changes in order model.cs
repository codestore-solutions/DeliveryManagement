using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class changesinordermodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "deliveryType",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "isOrderAssigned",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "deliveryType", "isOrderAssigned" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "deliveryType", "isOrderAssigned" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "deliveryType", "isOrderAssigned" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "deliveryType", "isOrderAssigned" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "deliveryType", "isOrderAssigned" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 26,
                columns: new[] { "deliveryType", "isOrderAssigned" },
                values: new object[] { 0, 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "deliveryType",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "isOrderAssigned",
                table: "orders");
        }
    }
}
