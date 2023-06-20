using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [MaxLength(600)]
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public User? User { get; set; }
        public Item? Item { get; set; }


    }
}
