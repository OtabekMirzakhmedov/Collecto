using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface ILikeService
    {
        Task<int> CreateLike(LikeDto likeDto);
        Task DeleteLike(LikeDto likeDto);
    }
}
