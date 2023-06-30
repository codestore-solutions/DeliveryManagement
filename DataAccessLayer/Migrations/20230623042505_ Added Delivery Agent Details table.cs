using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedDeliveryAgentDetailstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "ServiceLocationId",
                table: "deliveryAgents");

            migrationBuilder.RenameColumn(
                name: "Region",
                table: "deliveryAgents",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "deliveryAgents",
                newName: "DeliveryAgentId");

            migrationBuilder.AddColumn<string>(
                name: "AadharCardUrl",
                table: "deliveryAgents",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AgentGender",
                table: "deliveryAgents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "deliveryAgents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "DrivingLicenseUrl",
                table: "deliveryAgents",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "deliveryAgents",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PancardUrl",
                table: "deliveryAgents",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "deliveryAgents",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegistrationNumber",
                table: "deliveryAgents",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VehicleCompany",
                table: "deliveryAgents",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VehicleLicensePlate",
                table: "deliveryAgents",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VehicleModel",
                table: "deliveryAgents",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VehicleType",
                table: "deliveryAgents",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AadharCardUrl",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "AgentGender",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "DrivingLicenseUrl",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "PancardUrl",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "RegistrationNumber",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "VehicleCompany",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "VehicleLicensePlate",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "VehicleModel",
                table: "deliveryAgents");

            migrationBuilder.DropColumn(
                name: "VehicleType",
                table: "deliveryAgents");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "deliveryAgents",
                newName: "Region");

            migrationBuilder.RenameColumn(
                name: "DeliveryAgentId",
                table: "deliveryAgents",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "deliveryAgents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "deliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "deliveryAgents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "ServiceLocationId",
                table: "deliveryAgents",
                type: "bigint",
                nullable: true);
        }
    }
}
