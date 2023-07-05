namespace Collecto.BE.DTO
{
    public record CollectionDto
    {
        public string Title { get; init; }

        public string Topic { get; init; }

        public string Description { get; init; }

        public ICollection<CustomFieldDto> CustomFields { get; init; }

        public DateTime CreatedAt { get; init; }


    }
}
