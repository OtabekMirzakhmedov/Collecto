using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class Topic
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string? TopicName { get; set; }
        public ICollection<Collection> Collections { get; set; }
    }
}
