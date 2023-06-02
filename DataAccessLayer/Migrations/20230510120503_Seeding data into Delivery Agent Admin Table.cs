using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SeedingdataintoDeliveryAgentAdminTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "deliveryAgentAdmin",
                columns: new[] { "Id", "DeliveryAgentId" },
                values: new object[,]
                {
                    { 1001, 1 },
                    { 1002, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "deliveryAgentAdmin",
                keyColumn: "Id",
                keyValue: 1001);

            migrationBuilder.DeleteData(
                table: "deliveryAgentAdmin",
                keyColumn: "Id",
                keyValue: 1002);
        }
    }
}
