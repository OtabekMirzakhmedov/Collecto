using System.ComponentModel.DataAnnotations;

namespace Collecto.BE.Models
{
    public class CustomFieldValue
    {
        public int Id { get; set; }
        public CustomField CustomField { get; set; }
        public int CustomFieldId { get; set; }
        public int ItemId { get; set; }
        public Item? Item { get; set; }

        [MaxLength(1000)]
        public string? Value { get; set; }
    }
}
