using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.EntityFrameworkCore;

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
            collection.CreatedAt =  DateTime.Now;
            _dataContext.Collections.Add(collection);
            await _dataContext.SaveChangesAsync();
            return collection.Id;
        }

        public async Task DeleteCollectionById(int id)
        {
            var collection = _dataContext.Collections
                .Include(c => c.CustomFields)
                .ThenInclude(c => c.CustomFieldValues)
                .Include(c => c.Items)
                .ThenInclude(i => i.ItemTags)
                .FirstOrDefault(i => i.Id == id);
            _dataContext.Collections.Remove(collection);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<CollectionDto> GetCollectionById(int id)
        {
            var collection = await _dataContext.Collections
                .Include(c => c.Topic)
                .Include(c => c.CustomFields)
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (collection == null)
            {
                throw new Exception("Collection not found");
            }

            var collectionDto = _mapper.Map<CollectionDto>(collection);
            return collectionDto;
        }
    }
}
