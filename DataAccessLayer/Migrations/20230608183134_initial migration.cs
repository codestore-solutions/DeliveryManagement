using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class initialmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgentAssociations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false),
                    BuisnessAdminId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentAssociations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "buisnessAdmin",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessId = table.Column<long>(type: "bigint", nullable: false),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false),
                    DeliveryAgentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryAgentAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServiceLocationId = table.Column<long>(type: "bigint", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    OrderAssignStatus = table.Column<int>(type: "int", nullable: false),
                    AgentStatus = table.Column<int>(type: "int", nullable: false),
                    VerStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_buisnessAdmin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "deliveryAgents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Region = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceLocationId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_deliveryAgents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileExtension = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSizeInBytes = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "orderAssigns",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false),
                    OrderId = table.Column<long>(type: "bigint", nullable: false),
                    BuisnessId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderAssigns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderAmount = table.Column<double>(type: "float", nullable: true),
                    deliveryType = table.Column<int>(type: "int", nullable: false),
                    isOrderAssigned = table.Column<int>(type: "int", nullable: false),
                    paymentType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "serviceLocations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    OrderAssignStatus = table.Column<int>(type: "int", nullable: false),
                    AgentStatus = table.Column<int>(type: "int", nullable: false),
                    MaxDistance = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serviceLocations", x => x.Id);
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentAssociations");

            migrationBuilder.DropTable(
                name: "buisnessAdmin");

            migrationBuilder.DropTable(
                name: "deliveryAgents");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "orderAssigns");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "serviceLocations");
        }
    }
}
