using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmailManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateRoutingRulesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoutingRules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation(
                            "SqlServer:Identity",
                            "1, 1"),

                    Keyword = table.Column<string>(
                        type: "nvarchar(max)",
                        nullable: false),

                    Department = table.Column<string>(
                        type: "nvarchar(max)",
                        nullable: false),

                    Priority = table.Column<string>(
                        type: "nvarchar(max)",
                        nullable: false)
                },

                constraints: table =>
                {
                    table.PrimaryKey(
                        "PK_RoutingRules",
                        x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(
    MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoutingRules");
        }
    }
}
