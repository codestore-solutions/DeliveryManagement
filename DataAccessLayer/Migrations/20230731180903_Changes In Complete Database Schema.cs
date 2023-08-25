using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInCompleteDatabaseSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonalDetails");

            migrationBuilder.DropColumn(
                name: "FileDescription",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "VehicleImageUrl",
                table: "VechicleDetails",
                newName: "VehicleImage");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "VechicleDetails",
                newName: "VehicleModel");

            migrationBuilder.RenameColumn(
                name: "DeliveryAgentId",
                table: "VechicleDetails",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "DLNumber",
                table: "VechicleDetails",
                newName: "ManufacturedYear");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "VechicleDetails",
                newName: "Company");

            migrationBuilder.RenameColumn(
                name: "DeliveryAgentId",
                table: "ServiceLocations",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "kYCs",
                newName: "Photo");

            migrationBuilder.RenameColumn(
                name: "PancardUrl",
                table: "kYCs",
                newName: "Pancard");

            migrationBuilder.RenameColumn(
                name: "DrivingLicenseUrl",
                table: "kYCs",
                newName: "DrivingLicense");

            migrationBuilder.RenameColumn(
                name: "DeliveryAgentId",
                table: "kYCs",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "AadharCardUrl",
                table: "kYCs",
                newName: "AadharCard");

            migrationBuilder.RenameColumn(
                name: "YourName",
                table: "BankDetails",
                newName: "AccountHolderName");

            migrationBuilder.RenameColumn(
                name: "DeliveryAgentId",
                table: "BankDetails",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "DeliveryAgentId",
                table: "AssignDeliveryAgents",
                newName: "AgentId");

            migrationBuilder.AlterColumn<int>(
                name: "VehicleType",
                table: "VechicleDetails",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    AgentId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.AgentId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agents");

            migrationBuilder.RenameColumn(
                name: "VehicleModel",
                table: "VechicleDetails",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "VehicleImage",
                table: "VechicleDetails",
                newName: "VehicleImageUrl");

            migrationBuilder.RenameColumn(
                name: "ManufacturedYear",
                table: "VechicleDetails",
                newName: "DLNumber");

            migrationBuilder.RenameColumn(
                name: "Company",
                table: "VechicleDetails",
                newName: "CompanyName");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "VechicleDetails",
                newName: "DeliveryAgentId");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "ServiceLocations",
                newName: "DeliveryAgentId");

            migrationBuilder.RenameColumn(
                name: "Photo",
                table: "kYCs",
                newName: "PhotoUrl");

            migrationBuilder.RenameColumn(
                name: "Pancard",
                table: "kYCs",
                newName: "PancardUrl");

            migrationBuilder.RenameColumn(
                name: "DrivingLicense",
                table: "kYCs",
                newName: "DrivingLicenseUrl");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "kYCs",
                newName: "DeliveryAgentId");

            migrationBuilder.RenameColumn(
                name: "AadharCard",
                table: "kYCs",
                newName: "AadharCardUrl");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "BankDetails",
                newName: "DeliveryAgentId");

            migrationBuilder.RenameColumn(
                name: "AccountHolderName",
                table: "BankDetails",
                newName: "YourName");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "AssignDeliveryAgents",
                newName: "DeliveryAgentId");

            migrationBuilder.AlterColumn<string>(
                name: "VehicleType",
                table: "VechicleDetails",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "FileDescription",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PersonalDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryAgentId = table.Column<long>(type: "bigint", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalDetails", x => x.Id);
                });
        }
    }
}
