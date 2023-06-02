using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class addednewtables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgentAssociations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<int>(type: "int", nullable: false),
                    BuisnessAdminId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentAssociations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgentAssociations_buisnessAdmin_BuisnessAdminId",
                        column: x => x.BuisnessAdminId,
                        principalTable: "buisnessAdmin",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgentAssociations_deliveryAgents_DeliveryAgentId",
                        column: x => x.DeliveryAgentId,
                        principalTable: "deliveryAgents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "orderAssigns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryAgentId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderAssigns", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgentAssociations_BuisnessAdminId",
                table: "AgentAssociations",
                column: "BuisnessAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_AgentAssociations_DeliveryAgentId",
                table: "AgentAssociations",
                column: "DeliveryAgentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentAssociations");

            migrationBuilder.DropTable(
                name: "orderAssigns");
        }
    }
}
