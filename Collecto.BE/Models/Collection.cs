using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace Collecto.BE.Models
{
    public class Collection
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Title { get; set; }

        [Required]
        [MaxLength(2000)]
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TopicId { get; set; }

        [Required]
        public Topic Topic { get; set; }
        public string UserId { get; set; }
        
        [Required]
        public User User { get; set; }
        public ICollection<Item> Items { get; set; }
        public ICollection<CustomField> CustomFields { get; set; }
    }
}
