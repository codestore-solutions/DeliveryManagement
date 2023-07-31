using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedVerificationStatusColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgentEmailId",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "AgentLatitude",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "AgentLongitude",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "DeliveryAgentAddress",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "DeliveryAgentName",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "MaxDistance",
                table: "BusinessAdmin");

            migrationBuilder.DropColumn(
                name: "OrderAssignStatus",
                table: "BusinessAdmin");

            migrationBuilder.AddColumn<int>(
                name: "verificationStatus",
                table: "ServiceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "verificationStatus",
                table: "ServiceLocations");

            migrationBuilder.AddColumn<string>(
                name: "AgentEmailId",
                table: "BusinessAdmin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "AgentLatitude",
                table: "BusinessAdmin",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AgentLongitude",
                table: "BusinessAdmin",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "BusinessAdmin",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAgentAddress",
                table: "BusinessAdmin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAgentName",
                table: "BusinessAdmin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "MaxDistance",
                table: "BusinessAdmin",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderAssignStatus",
                table: "BusinessAdmin",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
