using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<ItemTag>? ItemTags { get; set; }

        public Collection? Collection { get; set; }

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Like>? Likes { get; set; }

        public ICollection<CustomFieldValue>? CustomFieldValues { get; set; }
    }
}
