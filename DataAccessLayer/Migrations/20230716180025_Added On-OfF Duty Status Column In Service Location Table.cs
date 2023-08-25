using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedOnOfFDutyStatusColumnInServiceLocationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "PersonalDetails");

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "ServiceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "ServiceLocations");

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "PersonalDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
