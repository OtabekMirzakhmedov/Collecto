﻿namespace Collecto.BE.DTO
{
    public record CollectionDto
    {
        public string Title { get; init; }

        public string TopicName { get; init; }

        public string Description { get; init; }

        public string? UserId { get; init; }

        public ICollection<CustomFieldDto>? CustomFields { get; init; }

        public ICollection<ItemDto> Items { get; set; }

        public DateTime CreatedAt { get; init; }

    }
}
