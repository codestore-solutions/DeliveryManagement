using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class seedingdataintoserivelocationtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "serviceLocations",
                columns: new[] { "Id", "DeliveryAgentId", "Latitude", "Longitude", "MaxDistance" },
                values: new object[,]
                {
                    { 1, 1, 29.416590500000002, 76.668152500000005, 10 },
                    { 2, 2, 29.4295905, 76.998152500000003, 10 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "serviceLocations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "serviceLocations",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
