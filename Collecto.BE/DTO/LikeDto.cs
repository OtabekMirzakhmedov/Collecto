namespace Collecto.BE.DTO
{
    public record LikeDto
    {
        public int ItemId { get; init; }
        public string UserId { get; init; }
    }
}
