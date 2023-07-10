using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class CustomFieldChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CustomFieldValues_CustomFieldId",
                table: "CustomFieldValues");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c376c95-d4ac-493d-b020-ce9e6c33b305");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fa72d2d9-e894-4dbb-b48a-a10860f02471");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "114668a7-1a76-49c1-90be-c0646f2c8065", "b0402440-da36-49e3-8c5f-c6c7e0d126d6", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "ecacab62-3d59-4fdf-9e49-731c22692571", "51c10082-24d1-46cd-8886-99546f645240", "User", "USER" });

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldValues_CustomFieldId",
                table: "CustomFieldValues",
                column: "CustomFieldId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CustomFieldValues_CustomFieldId",
                table: "CustomFieldValues");

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
                values: new object[] { "1c376c95-d4ac-493d-b020-ce9e6c33b305", "b77f5b4d-ad01-463b-bf8f-499b69081777", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fa72d2d9-e894-4dbb-b48a-a10860f02471", "06effcb7-dc3c-4758-a4c9-6f53f76f9e73", "User", "USER" });

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldValues_CustomFieldId",
                table: "CustomFieldValues",
                column: "CustomFieldId",
                unique: true);
        }
    }
}
