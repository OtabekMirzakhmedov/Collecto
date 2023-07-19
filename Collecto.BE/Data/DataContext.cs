using Collecto.BE.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Data
{
    public class DataContext: IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Collection> Collections { get; set; }

        public DbSet<Item> Items { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<CustomField> CustomFields { get; set; }

        public DbSet<CustomFieldValue> CustomFieldValues { get; set; }

        public DbSet<ItemTag> ItemTags { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Topic> Topics { get; set; }

        public DbSet<Like> Likes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            string Admin_User_Id = Guid.NewGuid().ToString();
            string Admin_Role_Id = Guid.NewGuid().ToString();
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ItemTag>()
                .HasKey(it => new { it.ItemId, it.TagId });

            modelBuilder.Entity<ItemTag>()
                .HasOne(it => it.Item)
                .WithMany(i => i.ItemTags)
                .HasForeignKey(it => it.ItemId);

            modelBuilder.Entity<ItemTag>()
                .HasOne(it => it.Tag)
                .WithMany(t => t.ItemTags)
                .HasForeignKey(it => it.TagId);

            modelBuilder.Entity<CustomField>()
                .HasMany(cf => cf.CustomFieldValues)
                .WithOne(cfv => cfv.CustomField)
                .HasForeignKey(cfv => cfv.CustomFieldId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Collection>()
                .HasMany(cl => cl.CustomFields)
                .WithOne(cf => cf.Collection)
                .HasForeignKey(cf => cf.CollectionId)
                .OnDelete(DeleteBehavior.Cascade);

            

            modelBuilder.Entity<IdentityRole>()
                .HasData(new IdentityRole { Name = "User", NormalizedName = "USER" },
                        new IdentityRole { Id = Admin_Role_Id,Name = "Admin", NormalizedName = "ADMIN" });
            
            modelBuilder.Entity<Collection>()
                .HasOne(c => c.Topic)
                .WithMany(t => t.Collections)
                .HasForeignKey(c => c.TopicId);

            modelBuilder.Entity<Collection>()
                .HasMany(c => c.Items)
                .WithOne(i => i.Collection)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Item>()
                .HasMany(i => i.ItemTags)
                .WithOne(it => it.Item)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Item>()
                .HasMany(i => i.Comments)
                .WithOne(it => it.Item)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Item>()
                .HasMany(i => i.Likes)
                .WithOne(i => i.Item)
                .OnDelete(DeleteBehavior.Cascade);

            var AdminUser = new User
            {
                Id = Admin_User_Id,
                FullName = "Otabek Mirzakmedov",
                Email = "admin@collecto.com",
                UserName = "admin@collecto.com",
                IsActive = true,
                NormalizedEmail = "ADMIN@COLLECTO.COM",
                NormalizedUserName = "ADMIN@COLLECTO.COM",
            };

            PasswordHasher<User> ph = new PasswordHasher<User>();

            AdminUser.PasswordHash = ph.HashPassword(AdminUser, "111111");

            modelBuilder.Entity<User>()
                .HasData(AdminUser);

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = Admin_Role_Id,
                UserId = Admin_User_Id
            });
        }  
    }
}
