using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Helper.Resolvers;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class CommentService : ICommentService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;


        public CommentService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<CommentDto> CreateComment(CommentDto commentDto)
        {
            var comment = new Comment
            {
                User = await _dataContext.Users.FindAsync(commentDto.UserId),
                Item = await _dataContext.Items.FindAsync(commentDto.ItemId),
                CreatedAt = DateTime.Now,
                Content = commentDto.Content
            };
            _dataContext.Comments.Add(comment);
            await _dataContext.SaveChangesAsync();
            commentDto.CommentId = comment.Id;
            commentDto.CreatedAt = comment.CreatedAt;
            commentDto.FullName = comment.User.FullName;
             
            return commentDto;
        }

        public async Task<ICollection<CommentDto>> GetCommentsByItemId(int itemId)
        {
            var comments = await _dataContext.Comments
                .Include(c => c.Item)
                .Include(c => c.User)
                .Where(c => c.Item.Id == itemId)
                .ToListAsync();

            return comments.Select(c => _mapper.Map<CommentDto>(c)).ToList();
        }
    }
}
