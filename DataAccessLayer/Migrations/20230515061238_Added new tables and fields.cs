using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class Addednewtablesandfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceLocationId",
                table: "deliveryAgents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "buisnessAdmin",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "buisnessAdmin",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "buisnessAdmin",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "ServiceLocationId",
                table: "buisnessAdmin",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VerStatus",
                table: "buisnessAdmin",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ServiceLocation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<int>(type: "int", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    MaxDistance = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceLocation", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "buisnessAdmin",
                keyColumn: "Id",
                keyValue: 1001,
                columns: new[] { "AgentStatus", "Latitude", "Longitude", "ServiceLocationId", "VerStatus" },
                values: new object[] { 0, 0.0, 0.0, null, 0 });

            migrationBuilder.UpdateData(
                table: "buisnessAdmin",
                keyColumn: "Id",
                keyValue: 1002,
                columns: new[] { "AgentStatus", "Latitude", "Longitude", "ServiceLocationId", "VerStatus" },
                values: new object[] { 0, 0.0, 0.0, null, 0 });

            migrationBuilder.UpdateData(
                table: "deliveryAgents",
                keyColumn: "Id",
                keyValue: 1,
                column: "ServiceLocationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "deliveryAgents",
                keyColumn: "Id",
                keyValue: 2,
                column: "ServiceLocationId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_deliveryAgents_ServiceLocationId",
                table: "deliveryAgents",
                column: "ServiceLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_buisnessAdmin_ServiceLocationId",
                table: "buisnessAdmin",
                column: "ServiceLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_buisnessAdmin_ServiceLocation_ServiceLocationId",
                table: "buisnessAdmin",
                column: "ServiceLocationId",
                principalTable: "ServiceLocation",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_deliveryAgents_ServiceLocation_ServiceLocationId",
                table: "deliveryAgents",
                column: "ServiceLocationId",
                principalTable: "ServiceLocation",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_buisnessAdmin_ServiceLocation_ServiceLocationId",
                table: "buisnessAdmin");

            migrationBuilder.DropForeignKey(
                name: "FK_deliveryAgents_ServiceLocation_ServiceLocationId",
                table: "deliveryAgents");

            migrationBuilder.DropTable(
                name: "ServiceLocation");

            migrationBuilder.DropIndex(
                name: "IX_deliveryAgents_ServiceLocationId",
                table: "deliveryAgents");

            migrationBuilder.DropIndex(
                name: "IX_buisnessAdmin_ServiceLocationId",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "ServiceLocationId",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "ServiceLocationId",
                table: "buisnessAdmin");

            migrationBuilder.DropColumn(
                name: "VerStatus",
                table: "buisnessAdmin");
        }
    }
}
