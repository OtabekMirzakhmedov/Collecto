using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class ChangeCollectionNameToTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e41664b-b932-491f-a55b-d9de8c4c1a48");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ed38683-e512-4053-b767-42b8cf24739e");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Collections",
                newName: "Title");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0ef2a463-3fd8-43bf-97b0-5aab4ecc3e8a", "05a866fc-e2ba-410c-9aed-a265ac8fc70f", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "545babd3-7c46-44d7-96f7-c9092374c754", "ed30e993-d9e0-4caa-abe2-52341f1035ce", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0ef2a463-3fd8-43bf-97b0-5aab4ecc3e8a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "545babd3-7c46-44d7-96f7-c9092374c754");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Collections",
                newName: "Name");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7e41664b-b932-491f-a55b-d9de8c4c1a48", "4ca8a7a1-0596-4e4c-b94d-a0bd14af5f26", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8ed38683-e512-4053-b767-42b8cf24739e", "7d691626-f83e-4592-bd63-5ccac8af1247", "User", "USER" });
        }
    }
}
