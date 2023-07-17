namespace Collecto.BE.DTO
{
    public record ItemDto
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public DateTime CreatedAt { get; init; }
        public ICollection<string> ItemTags { get; init; }
        public int NumberOfLikes { get; init; }

        public ICollection<string>? LikedUsers { get; init; }
        public ICollection<CustomFieldValueDto>? CustomFieldValues { get; init; }
    }
}
