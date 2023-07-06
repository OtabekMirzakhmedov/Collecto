using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class ChangeCollectionTopicRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0ef2a463-3fd8-43bf-97b0-5aab4ecc3e8a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "545babd3-7c46-44d7-96f7-c9092374c754");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8dbc0f32-500d-453c-848a-70dc3083f0f5", "81f21398-9472-468c-ac09-49c1cd19dafa", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "febc9de5-b7bf-4038-b95a-eb3f98b9229a", "93ae0d0c-df02-41aa-942f-1065c339afa9", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8dbc0f32-500d-453c-848a-70dc3083f0f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "febc9de5-b7bf-4038-b95a-eb3f98b9229a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0ef2a463-3fd8-43bf-97b0-5aab4ecc3e8a", "05a866fc-e2ba-410c-9aed-a265ac8fc70f", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "545babd3-7c46-44d7-96f7-c9092374c754", "ed30e993-d9e0-4caa-abe2-52341f1035ce", "Admin", "ADMIN" });
        }
    }
}
