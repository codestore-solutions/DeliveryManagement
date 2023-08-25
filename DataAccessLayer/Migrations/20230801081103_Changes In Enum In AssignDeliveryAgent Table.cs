using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInEnumInAssignDeliveryAgentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "orderStatus",
                table: "AssignDeliveryAgents",
                newName: "deliveryStatus");

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryImage",
                table: "AssignDeliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PickupImage",
                table: "AssignDeliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryImage",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "PickupImage",
                table: "AssignDeliveryAgents");

            migrationBuilder.RenameColumn(
                name: "deliveryStatus",
                table: "AssignDeliveryAgents",
                newName: "orderStatus");

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
