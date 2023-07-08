namespace Collecto.BE.DTO
{
    public record ItemDto
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public ICollection<string> ItemTags { get; init; }
        public ICollection<CustomFieldValueDto>? CustomFieldValues { get; init; }
    }
}
