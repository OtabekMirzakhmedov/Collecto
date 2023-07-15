using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class LikeService : ILikeService
    {
        private readonly DataContext _dataContext;
        public LikeService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<int> CreateLike(LikeDto likeDto)
        {
            var user = await _dataContext.Users.FindAsync(likeDto.UserId);
            var item = await _dataContext.Items.FindAsync(likeDto.ItemId);

            if (user == null || item == null)
            {
                return 0;
            }

            var like = new Like
            {
                User = user,
                Item = item
            };

            _dataContext.Likes.Add(like);
            await _dataContext.SaveChangesAsync();

            return like.Id;
        }

        public async Task DeleteLike(LikeDto likeDto)
        {
            var like = await _dataContext.Likes.FirstOrDefaultAsync(l => l.Item.Id == likeDto.ItemId && l.User.Id == likeDto.UserId);
            _dataContext.Likes.Remove(like);
            await _dataContext.SaveChangesAsync();
        }
    }
}
