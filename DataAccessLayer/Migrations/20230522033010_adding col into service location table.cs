using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class addingcolintoservicelocationtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "serviceLocations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AgentStatus", "OrderAssignStatus" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "serviceLocations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AgentStatus", "OrderAssignStatus" },
                values: new object[] { 0, 0 });

            migrationBuilder.UpdateData(
                table: "serviceLocations",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AgentStatus", "OrderAssignStatus" },
                values: new object[] { 0, 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "serviceLocations");

            migrationBuilder.DropColumn(
                name: "OrderAssignStatus",
                table: "serviceLocations");
        }
    }
}
