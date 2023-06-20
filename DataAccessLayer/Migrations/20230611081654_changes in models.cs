using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class changesinmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentAssociations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orderAssigns",
                table: "orderAssigns");

            migrationBuilder.DeleteData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 21L);

            migrationBuilder.DeleteData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 22L);

            migrationBuilder.DeleteData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 23L);

            migrationBuilder.DeleteData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 24L);

            migrationBuilder.DeleteData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 25L);

            migrationBuilder.DeleteData(
                table: "orders",
                keyColumn: "Id",
                keyValue: 26L);

            migrationBuilder.DropColumn(
                name: "OrderAmount",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "deliveryType",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "isOrderAssigned",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "paymentType",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "BuisnessId",
                table: "orderAssigns");

            migrationBuilder.RenameTable(
                name: "orderAssigns",
                newName: "AssignDeliveryAgents");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "AssignDeliveryAgents",
                newName: "BusinessId");

            migrationBuilder.AddColumn<long>(
                name: "AssignDeliveryAgentId",
                table: "orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "AvailabeStatus",
                table: "AssignDeliveryAgents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AssignDeliveryAgents",
                table: "AssignDeliveryAgents",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_orders_AssignDeliveryAgentId",
                table: "orders",
                column: "AssignDeliveryAgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "orders",
                column: "AssignDeliveryAgentId",
                principalTable: "AssignDeliveryAgents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_AssignDeliveryAgents_AssignDeliveryAgentId",
                table: "orders");

            migrationBuilder.DropTable(
                name: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_orders_AssignDeliveryAgentId",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AssignDeliveryAgents",
                table: "AssignDeliveryAgents");

            migrationBuilder.DropColumn(
                name: "AssignDeliveryAgentId",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "AvailabeStatus",
                table: "AssignDeliveryAgents");

            migrationBuilder.RenameTable(
                name: "AssignDeliveryAgents",
                newName: "orderAssigns");

            migrationBuilder.RenameColumn(
                name: "BusinessId",
                table: "orderAssigns",
                newName: "OrderId");

            migrationBuilder.AddColumn<double>(
                name: "OrderAmount",
                table: "orders",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "deliveryType",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "isOrderAssigned",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "paymentType",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "BuisnessId",
                table: "orderAssigns",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_orderAssigns",
                table: "orderAssigns",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AgentAssociations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuisnessAdminId = table.Column<long>(type: "bigint", nullable: false),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentAssociations", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "orders",
                columns: new[] { "Id", "OrderAmount", "ShippingAddress", "deliveryType", "isOrderAssigned", "paymentType" },
                values: new object[,]
                {
                    { 21L, 2799.0, "Noida Sector 59", 0, 0, 2 },
                    { 22L, 9799.0, "Noida Sector 6", 0, 0, 1 },
                    { 23L, 18799.0, "Noida Electronic City", 0, 0, 2 },
                    { 24L, 799.0, "Dwarka Sector 21", 0, 0, 1 },
                    { 25L, 18299.0, "Malviya Nagar Delhi", 0, 0, 2 },
                    { 26L, 24799.0, "Noida Sector 62", 0, 0, 2 }
                });
        }
    }
}
