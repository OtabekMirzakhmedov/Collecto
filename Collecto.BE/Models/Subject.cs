using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class Subject
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string? SubjectName { get; set; }

        public ICollection<Collection> Collections { get; set; }
    }
}
