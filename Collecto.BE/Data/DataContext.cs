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

            modelBuilder.Entity<CustomFieldValue>()
                .HasOne(cfv => cfv.CustomField)
                .WithOne(cf => cf.CustomFieldValue);

            modelBuilder.Entity<IdentityRole>()
                .HasData(new IdentityRole { Name = "User", NormalizedName = "USER" },
                        new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" });
            
            modelBuilder.Entity<Collection>()
                .HasOne(c => c.Topic)
                .WithMany(t => t.Collections)
                .HasForeignKey(c => c.TopicId);
        }  
    }
}
