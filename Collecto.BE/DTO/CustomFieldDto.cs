namespace Collecto.BE.DTO
{
    public record CustomFieldDto
    {
        public int CustomFieldId { get; set; }

        public string FieldName { get; init; }

        public string FieldType { get; init; }
    }
}
