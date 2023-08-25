using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInServiceLocationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "MaxDistance",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "verificationStatus",
                table: "ServiceLocations");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "ServiceLocations",
                newName: "AgentDetailId");

            migrationBuilder.RenameColumn(
                name: "ServiceLocationId",
                table: "ServiceLocations",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "deliveryStatus",
                table: "AssignDeliveryAgents",
                newName: "DeliveryStatus");

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "AgentDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "verificationStatus",
                table: "AgentDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ServiceLocations_AgentDetailId",
                table: "ServiceLocations",
                column: "AgentDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLocations_AgentDetails_AgentDetailId",
                table: "ServiceLocations",
                column: "AgentDetailId",
                principalTable: "AgentDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLocations_AgentDetails_AgentDetailId",
                table: "ServiceLocations");

            migrationBuilder.DropIndex(
                name: "IX_ServiceLocations_AgentDetailId",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "AgentStatus",
                table: "AgentDetails");

            migrationBuilder.DropColumn(
                name: "verificationStatus",
                table: "AgentDetails");

            migrationBuilder.RenameColumn(
                name: "AgentDetailId",
                table: "ServiceLocations",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ServiceLocations",
                newName: "ServiceLocationId");

            migrationBuilder.RenameColumn(
                name: "DeliveryStatus",
                table: "AssignDeliveryAgents",
                newName: "deliveryStatus");

            migrationBuilder.AddColumn<int>(
                name: "AgentStatus",
                table: "ServiceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaxDistance",
                table: "ServiceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "verificationStatus",
                table: "ServiceLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileExtension = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSizeInBytes = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });
        }
    }
}
