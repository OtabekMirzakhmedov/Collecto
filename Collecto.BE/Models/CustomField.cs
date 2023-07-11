using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class CustomField
    {
        public int Id { get; set; }

        public int CollectionId { get; set; }

        public Collection? Collection { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Type { get; set; }

        public ICollection<CustomFieldValue>? CustomFieldValues { get; set; }
    }
}
