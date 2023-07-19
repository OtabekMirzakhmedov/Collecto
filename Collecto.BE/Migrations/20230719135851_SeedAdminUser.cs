using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class SeedAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38dc2734-090e-4548-9297-b0ea2d82cf44");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "893b3664-4ec0-479f-9323-a0e4641bd704", "47a0cca9-c38e-4003-b9de-e5598fc5d9c0" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "893b3664-4ec0-479f-9323-a0e4641bd704");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "47a0cca9-c38e-4003-b9de-e5598fc5d9c0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "820415be-6190-400b-b3f3-7c8048bc7b3f", "205acc16-e097-47bf-95f8-f77acd061115", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f76255b5-f193-4efa-aed6-9941a10879e7", "5e87c172-4459-4e1b-88c1-822c7ee9934a", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "FullName", "IsActive", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "75553dd4-7a76-4814-b534-a6d079d9b5ef", 0, "f0cf67c4-2db6-48a9-80c5-fd985a8fe4c8", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin@collecto.com", false, "Otabek Mirzakmedov", true, false, null, "ADMIN@COLLECTO.COM", "ADMIN@COLLECTO.COM", "AQAAAAEAACcQAAAAEBHRNZDOxgxI1gI9clH9XEOGuYVZxBsy8bMi3+kZQx+ExxP0jzrPqAGCGcwlDMWZbQ==", null, false, "83f46f17-779d-45ff-b531-36cb0b018200", false, "admin@collecto.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "820415be-6190-400b-b3f3-7c8048bc7b3f", "75553dd4-7a76-4814-b534-a6d079d9b5ef" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f76255b5-f193-4efa-aed6-9941a10879e7");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "820415be-6190-400b-b3f3-7c8048bc7b3f", "75553dd4-7a76-4814-b534-a6d079d9b5ef" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "820415be-6190-400b-b3f3-7c8048bc7b3f");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "75553dd4-7a76-4814-b534-a6d079d9b5ef");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "38dc2734-090e-4548-9297-b0ea2d82cf44", "89cef61d-5398-445b-b59e-61468e37963f", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "893b3664-4ec0-479f-9323-a0e4641bd704", "f729d841-2bc7-44e6-bc7c-58d4e013cdee", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "FullName", "IsActive", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "47a0cca9-c38e-4003-b9de-e5598fc5d9c0", 0, "6c7bb58d-4bef-40eb-a563-cefd477c313f", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin@collecto.com", false, "Otabek Mirzakmedov", true, false, null, null, null, "AQAAAAEAACcQAAAAEGhBER31cD6zfRTIOLsvW55TzohU327SldEyM14cNZS3NabZVXv+1eti3mcdg7EytA==", null, false, "9875e66c-8cd1-4317-ba9f-90ff8cf3d265", false, "admin@collecto.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "893b3664-4ec0-479f-9323-a0e4641bd704", "47a0cca9-c38e-4003-b9de-e5598fc5d9c0" });
        }
    }
}
