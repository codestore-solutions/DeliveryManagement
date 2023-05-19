using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class Addednewtablesandfields1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_buisnessAdmin_ServiceLocation_ServiceLocationId",
                table: "buisnessAdmin");

            migrationBuilder.DropForeignKey(
                name: "FK_deliveryAgents_ServiceLocation_ServiceLocationId",
                table: "deliveryAgents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceLocation",
                table: "ServiceLocation");

            migrationBuilder.RenameTable(
                name: "ServiceLocation",
                newName: "serviceLocations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_serviceLocations",
                table: "serviceLocations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_buisnessAdmin_serviceLocations_ServiceLocationId",
                table: "buisnessAdmin",
                column: "ServiceLocationId",
                principalTable: "serviceLocations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_deliveryAgents_serviceLocations_ServiceLocationId",
                table: "deliveryAgents",
                column: "ServiceLocationId",
                principalTable: "serviceLocations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_buisnessAdmin_serviceLocations_ServiceLocationId",
                table: "buisnessAdmin");

            migrationBuilder.DropForeignKey(
                name: "FK_deliveryAgents_serviceLocations_ServiceLocationId",
                table: "deliveryAgents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_serviceLocations",
                table: "serviceLocations");

            migrationBuilder.RenameTable(
                name: "serviceLocations",
                newName: "ServiceLocation");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceLocation",
                table: "ServiceLocation",
                column: "Id");

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
    }
}
