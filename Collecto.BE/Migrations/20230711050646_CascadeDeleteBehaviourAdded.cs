using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class CascadeDeleteBehaviourAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Collections_CollectionId",
                table: "Items");

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
                values: new object[] { "3f8600b8-f2e2-409e-968d-1a105327ebfe", "a9fb9a50-6636-4732-a354-a3a224b8ca1c", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c7577e5f-3ce6-4d33-8572-52bd25d8ff8e", "a2c55e35-a344-407c-91b1-9dc19f38e863", "Admin", "ADMIN" });

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Collections_CollectionId",
                table: "Items",
                column: "CollectionId",
                principalTable: "Collections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Collections_CollectionId",
                table: "Items");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f8600b8-f2e2-409e-968d-1a105327ebfe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7577e5f-3ce6-4d33-8572-52bd25d8ff8e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "af86d99a-b4f6-424b-a560-b25c3b4f2401", "ba813fd8-0b4b-4e3e-b71f-e629d69ddf4e", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fcc44068-f354-4d5e-8a79-137bed3b3537", "8b524e19-4ef3-43fc-88ed-2331825f2c7f", "User", "USER" });

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Collections_CollectionId",
                table: "Items",
                column: "CollectionId",
                principalTable: "Collections",
                principalColumn: "Id");
        }
    }
}
