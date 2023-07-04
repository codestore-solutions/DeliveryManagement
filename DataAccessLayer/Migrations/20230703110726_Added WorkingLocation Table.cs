using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedWorkingLocationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "WorkingLocationId",
                table: "ServiceLocations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "WorkingLocation",
                columns: table => new
                {
                    WorkingLocationId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingLocation", x => x.WorkingLocationId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceLocations_WorkingLocationId",
                table: "ServiceLocations",
                column: "WorkingLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLocations_WorkingLocation_WorkingLocationId",
                table: "ServiceLocations",
                column: "WorkingLocationId",
                principalTable: "WorkingLocation",
                principalColumn: "WorkingLocationId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLocations_WorkingLocation_WorkingLocationId",
                table: "ServiceLocations");

            migrationBuilder.DropTable(
                name: "WorkingLocation");

            migrationBuilder.DropIndex(
                name: "IX_ServiceLocations_WorkingLocationId",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "WorkingLocationId",
                table: "ServiceLocations");
        }
    }
}
