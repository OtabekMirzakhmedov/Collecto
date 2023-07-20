using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class Item
    {
        public Item()
        {
            ItemTags = new List<ItemTag>();
        }
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<ItemTag> ItemTags { get; set; }

        public Collection? Collection { get; set; }

        public ICollection<Comment>? Comments { get; set; }

        public ICollection<Like>? Likes { get; set; }

        public ICollection<CustomFieldValue>? CustomFieldValues { get; set; }

        public bool ContainsSearchTerm(string searchTerm)
        {
            return (Name != null && Name.IndexOf(searchTerm, StringComparison.OrdinalIgnoreCase) >= 0)
                || (Comments != null && Comments.Any(comment => comment.Content.IndexOf(searchTerm, StringComparison.OrdinalIgnoreCase) >= 0))
                || (CustomFieldValues != null && CustomFieldValues.Any(fieldValue => fieldValue.Value.IndexOf(searchTerm, StringComparison.OrdinalIgnoreCase) >= 0));
        }
    }
}
