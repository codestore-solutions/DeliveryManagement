using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedTimeSlotTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "ServiceLocations");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "ServiceLocations");

            migrationBuilder.CreateTable(
                name: "AgentTimeSlots",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TimeSlotId = table.Column<long>(type: "bigint", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    ServiceLocationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentTimeSlots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgentTimeSlots_ServiceLocations_ServiceLocationId",
                        column: x => x.ServiceLocationId,
                        principalTable: "ServiceLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeSlots",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessId = table.Column<long>(type: "bigint", nullable: true),
                    SlotName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSlots", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgentTimeSlots_ServiceLocationId",
                table: "AgentTimeSlots",
                column: "ServiceLocationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentTimeSlots");

            migrationBuilder.DropTable(
                name: "TimeSlots");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndTime",
                table: "ServiceLocations",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "ServiceLocations",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
