using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class seedingdataintoordertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "buisnessAdmin",
                keyColumn: "Id",
                keyValue: 1001);

            migrationBuilder.DeleteData(
                table: "buisnessAdmin",
                keyColumn: "Id",
                keyValue: 1002);

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderAmount = table.Column<double>(type: "float", nullable: true),
                    paymentType = table.Column<int>(type: "int", nullable: false),
                    BusinessAdminId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_orders_buisnessAdmin_BusinessAdminId",
                        column: x => x.BusinessAdminId,
                        principalTable: "buisnessAdmin",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "orders",
                columns: new[] { "Id", "BusinessAdminId", "OrderAmount", "ShippingAddress", "paymentType" },
                values: new object[,]
                {
                    { 21, null, 2799.0, "Noida Sector 59", 2 },
                    { 22, null, 9799.0, "Noida Sector 6", 1 },
                    { 23, null, 18799.0, "Noida Electronic City", 2 },
                    { 24, null, 799.0, "Dwarka Sector 21", 1 },
                    { 25, null, 18299.0, "Malviya Nagar Delhi", 2 },
                    { 26, null, 24799.0, "Noida Sector 62", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_orders_BusinessAdminId",
                table: "orders",
                column: "BusinessAdminId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.InsertData(
                table: "buisnessAdmin",
                columns: new[] { "Id", "AgentStatus", "DeliveryAgentAddress", "DeliveryAgentId", "DeliveryAgentName", "Latitude", "Longitude", "OrderAssignStatus", "ServiceLocationId", "ShippingAddress", "VerStatus" },
                values: new object[,]
                {
                    { 1001, 0, null, 1, null, 0.0, 0.0, 0, null, null, 0 },
                    { 1002, 0, null, 2, null, 0.0, 0.0, 0, null, null, 0 }
                });
        }
    }
}
