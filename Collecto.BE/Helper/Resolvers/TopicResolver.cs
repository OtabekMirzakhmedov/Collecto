using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Models;

namespace Collecto.BE.Helper.Resolvers
{
    public class TopicResolver : IValueResolver<CollectionDto, Collection, Topic>
    {
        private readonly DataContext _dataContext;

        public TopicResolver(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Topic Resolve(CollectionDto source, Collection destination, Topic destMember, ResolutionContext context)
        {
            var topic = _dataContext.Topics.FirstOrDefault(t => t.TopicName == source.TopicName);

            if (topic == null)
            {
                topic = new Topic { TopicName = source.TopicName };
                _dataContext.Topics.Add(topic);
            }

            return topic;
        }
    }

}
