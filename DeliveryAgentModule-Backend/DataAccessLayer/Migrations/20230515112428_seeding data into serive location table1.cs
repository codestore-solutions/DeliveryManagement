using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class seedingdataintoserivelocationtable1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "serviceLocations",
                columns: new[] { "Id", "DeliveryAgentId", "Latitude", "Longitude", "MaxDistance" },
                values: new object[] { 3, 3, 29.4065905, 76.268152499999999, 10 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "serviceLocations",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
