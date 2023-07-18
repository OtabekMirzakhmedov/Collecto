namespace Collecto.BE.DTO
{
    public record CommentDto
    {
        public int CommentId { get; set; }
        public string UserId { get; init; }
        public string? FullName { get; set; }
        public int ItemId { get; init; }

        public string Content { get; init; }

        public DateTime CreatedAt { get; set; }
    }
}
