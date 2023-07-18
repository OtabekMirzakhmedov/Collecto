using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface ICommentService
    {
        Task<CommentDto> CreateComment(CommentDto commentDto);
        Task<ICollection<CommentDto>> GetCommentsByItemId(int itemId);
    }
}
