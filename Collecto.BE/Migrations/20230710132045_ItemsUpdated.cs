using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class ItemsUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "114668a7-1a76-49c1-90be-c0646f2c8065");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ecacab62-3d59-4fdf-9e49-731c22692571");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "af86d99a-b4f6-424b-a560-b25c3b4f2401", "ba813fd8-0b4b-4e3e-b71f-e629d69ddf4e", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fcc44068-f354-4d5e-8a79-137bed3b3537", "8b524e19-4ef3-43fc-88ed-2331825f2c7f", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af86d99a-b4f6-424b-a560-b25c3b4f2401");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fcc44068-f354-4d5e-8a79-137bed3b3537");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "114668a7-1a76-49c1-90be-c0646f2c8065", "b0402440-da36-49e3-8c5f-c6c7e0d126d6", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ecacab62-3d59-4fdf-9e49-731c22692571", "51c10082-24d1-46cd-8886-99546f645240", "User", "USER" });
        }
    }
}
