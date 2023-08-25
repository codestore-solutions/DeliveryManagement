using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddedRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonalDetails");

            migrationBuilder.DropColumn(
                name: "AadharCard",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "DrivingLicense",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "Pancard",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "kYCs");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "kYCs",
                newName: "AgentDetailId");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "BankDetails",
                newName: "AgentDetailId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "VechicleDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "VechicleDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "kYCs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Document",
                table: "kYCs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DocumentType",
                table: "kYCs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "kYCs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "BankDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "BankDetails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AgentDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AgentId = table.Column<long>(type: "bigint", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsProfileCompleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentDetails", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_kYCs_AgentDetailId",
                table: "kYCs",
                column: "AgentDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_BankDetails_AgentDetailId",
                table: "BankDetails",
                column: "AgentDetailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BankDetails_AgentDetails_AgentDetailId",
                table: "BankDetails",
                column: "AgentDetailId",
                principalTable: "AgentDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_kYCs_AgentDetails_AgentDetailId",
                table: "kYCs",
                column: "AgentDetailId",
                principalTable: "AgentDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BankDetails_AgentDetails_AgentDetailId",
                table: "BankDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_kYCs_AgentDetails_AgentDetailId",
                table: "kYCs");

            migrationBuilder.DropTable(
                name: "AgentDetails");

            migrationBuilder.DropIndex(
                name: "IX_kYCs_AgentDetailId",
                table: "kYCs");

            migrationBuilder.DropIndex(
                name: "IX_BankDetails_AgentDetailId",
                table: "BankDetails");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "VechicleDetails");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "VechicleDetails");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "Document",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "DocumentType",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "kYCs");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "BankDetails");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "BankDetails");

            migrationBuilder.RenameColumn(
                name: "AgentDetailId",
                table: "kYCs",
                newName: "AgentId");

            migrationBuilder.RenameColumn(
                name: "AgentDetailId",
                table: "BankDetails",
                newName: "AgentId");

            migrationBuilder.AddColumn<string>(
                name: "AadharCard",
                table: "kYCs",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DrivingLicense",
                table: "kYCs",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pancard",
                table: "kYCs",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "kYCs",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PersonalDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgentId = table.Column<long>(type: "bigint", nullable: false),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsProfileCompleted = table.Column<bool>(type: "bit", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfileImage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalDetails", x => x.Id);
                });
        }
    }
}
