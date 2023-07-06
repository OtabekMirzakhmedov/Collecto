using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Collecto.BE.Migrations
{
    public partial class ChangeSubjectToTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collections_Subjects_SubjectId",
                table: "Collections");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41deb30e-b459-48cb-a803-50133ff83571");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4211b293-3d0a-4088-bf53-727108266fc4");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "Collections",
                newName: "TopicId");

            migrationBuilder.RenameIndex(
                name: "IX_Collections_SubjectId",
                table: "Collections",
                newName: "IX_Collections_TopicId");

            migrationBuilder.CreateTable(
                name: "Topics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TopicName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "7e41664b-b932-491f-a55b-d9de8c4c1a48", "4ca8a7a1-0596-4e4c-b94d-a0bd14af5f26", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8ed38683-e512-4053-b767-42b8cf24739e", "7d691626-f83e-4592-bd63-5ccac8af1247", "User", "USER" });

            migrationBuilder.AddForeignKey(
                name: "FK_Collections_Topics_TopicId",
                table: "Collections",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collections_Topics_TopicId",
                table: "Collections");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7e41664b-b932-491f-a55b-d9de8c4c1a48");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ed38683-e512-4053-b767-42b8cf24739e");

            migrationBuilder.RenameColumn(
                name: "TopicId",
                table: "Collections",
                newName: "SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Collections_TopicId",
                table: "Collections",
                newName: "IX_Collections_SubjectId");

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubjectName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "41deb30e-b459-48cb-a803-50133ff83571", "6b97af3c-105f-47bf-9837-f6ae72b90761", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4211b293-3d0a-4088-bf53-727108266fc4", "d741aa1c-5566-49c5-af97-0eb52af65021", "Admin", "ADMIN" });

            migrationBuilder.AddForeignKey(
                name: "FK_Collections_Subjects_SubjectId",
                table: "Collections",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
