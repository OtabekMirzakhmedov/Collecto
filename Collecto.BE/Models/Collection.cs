using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace Collecto.BE.Models
{
    public class Collection
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(2000)]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }

        [Required]
        public Subject Subject { get; set; }

        public User? User { get; set; }

        public ICollection<Item>? Items { get; set; }

        public ICollection<CustomField>? CustomFields { get; set; }
    }
}
