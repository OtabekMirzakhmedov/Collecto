using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class TopicService : ITopicService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public TopicService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<IList<string>> GetAllTopics()
        {
            var topics = await _dataContext.Topics
                .Select(topic => topic.TopicName)
                .ToListAsync();

            return topics;
        }
    }
}
