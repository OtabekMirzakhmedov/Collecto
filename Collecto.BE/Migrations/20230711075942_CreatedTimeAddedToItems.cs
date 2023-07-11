using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class CreatedTimeAddedToItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f8600b8-f2e2-409e-968d-1a105327ebfe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7577e5f-3ce6-4d33-8572-52bd25d8ff8e");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Items",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "CollectionId",
                table: "CustomFields",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "470d26bd-09f4-4de1-b1ae-469e5a5576b8", "991f7467-4802-4dba-a632-3010405cb0a6", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d8c26448-243e-4374-9de5-90f2d461904f", "4f37e7b4-9b19-4311-b9e0-913509f0bc1d", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "470d26bd-09f4-4de1-b1ae-469e5a5576b8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8c26448-243e-4374-9de5-90f2d461904f");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "CollectionId",
                table: "CustomFields",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3f8600b8-f2e2-409e-968d-1a105327ebfe", "a9fb9a50-6636-4732-a354-a3a224b8ca1c", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c7577e5f-3ce6-4d33-8572-52bd25d8ff8e", "a2c55e35-a344-407c-91b1-9dc19f38e863", "Admin", "ADMIN" });
        }
    }
}
