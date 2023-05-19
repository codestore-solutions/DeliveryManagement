using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SomechangesinDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "deliveryAgentAdmin");

            migrationBuilder.CreateTable(
                name: "buisnessAdmin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_buisnessAdmin", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "buisnessAdmin",
                columns: new[] { "Id", "DeliveryAgentId" },
                values: new object[,]
                {
                    { 1001, 1 },
                    { 1002, 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "buisnessAdmin");

            migrationBuilder.CreateTable(
                name: "deliveryAgentAdmin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_deliveryAgentAdmin", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "deliveryAgentAdmin",
                columns: new[] { "Id", "DeliveryAgentId" },
                values: new object[,]
                {
                    { 1001, 1 },
                    { 1002, 2 }
                });
        }
    }
}
