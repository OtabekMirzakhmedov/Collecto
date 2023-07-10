using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class ItemIdAddedtoCustomFieldValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomFieldValues_Items_ItemId",
                table: "CustomFieldValues");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "222b1c55-89c6-4ae7-af08-1f6cfe89e9b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d20138fc-6b5e-4add-92a1-74f489027bba");

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "CustomFieldValues",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1c376c95-d4ac-493d-b020-ce9e6c33b305", "b77f5b4d-ad01-463b-bf8f-499b69081777", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fa72d2d9-e894-4dbb-b48a-a10860f02471", "06effcb7-dc3c-4758-a4c9-6f53f76f9e73", "User", "USER" });

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFieldValues_Items_ItemId",
                table: "CustomFieldValues",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomFieldValues_Items_ItemId",
                table: "CustomFieldValues");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c376c95-d4ac-493d-b020-ce9e6c33b305");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fa72d2d9-e894-4dbb-b48a-a10860f02471");

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "CustomFieldValues",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "222b1c55-89c6-4ae7-af08-1f6cfe89e9b8", "8a63ba27-c408-46eb-b3ad-f15ad064dc13", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d20138fc-6b5e-4add-92a1-74f489027bba", "d1f0ec82-77bf-4f80-8d96-ae5ba13ae0dc", "User", "USER" });

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFieldValues_Items_ItemId",
                table: "CustomFieldValues",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }
    }
}
