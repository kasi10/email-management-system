using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmailManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAIFieldsToQuery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AiResponseRaw",
                table: "Queries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedTeam",
                table: "Queries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Queries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ClassifiedAt",
                table: "Queries",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsClassified",
                table: "Queries",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Queries",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Queries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AiResponseRaw",
                table: "Queries");

            migrationBuilder.DropColumn(
                name: "AssignedTeam",
                table: "Queries");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Queries");

            migrationBuilder.DropColumn(
                name: "ClassifiedAt",
                table: "Queries");

            migrationBuilder.DropColumn(
                name: "IsClassified",
                table: "Queries");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Queries");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Queries");
        }
    }
}
