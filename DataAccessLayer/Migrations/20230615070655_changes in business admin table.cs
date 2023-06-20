using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class changesinbusinessadmintable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceLocationId",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "ShippingAddress",
                table: "buisnessAdmin");

            migrationBuilder.RenameColumn(
                name: "VerStatus",
                table: "buisnessAdmin",
                newName: "MaxDistance");

            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "buisnessAdmin",
                newName: "AgentLongitude");

            migrationBuilder.RenameColumn(
                name: "Latitude",
                table: "buisnessAdmin",
                newName: "AgentLatitude");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "deliveryAgents",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryAgentName",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryAgentAddress",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaxDistance",
                table: "buisnessAdmin",
                newName: "VerStatus");

            migrationBuilder.RenameColumn(
                name: "AgentLongitude",
                table: "buisnessAdmin",
                newName: "Longitude");

            migrationBuilder.RenameColumn(
                name: "AgentLatitude",
                table: "buisnessAdmin",
                newName: "Latitude");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "deliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryAgentName",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryAgentAddress",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<long>(
                name: "ServiceLocationId",
                table: "buisnessAdmin",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress",
                table: "buisnessAdmin",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
