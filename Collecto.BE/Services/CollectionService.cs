using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;

namespace Collecto.BE.Services
{
    public class CollectionService : ICollectionService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public CollectionService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<int> CreateCollection(string userId, CollectionDto collectionDto)
        {
            var collection = _mapper.Map<Collection>(collectionDto);
            collection.UserId = userId;
            _dataContext.Collections.Add(collection);
            await _dataContext.SaveChangesAsync();
            return collection.Id;
        }
    }
}
