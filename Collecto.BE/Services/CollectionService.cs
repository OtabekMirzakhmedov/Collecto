using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Helper.Resolvers;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class CollectionService : ICollectionService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly TopicResolver _topicResolver;

        public CollectionService(DataContext dataContext, IMapper mapper, TopicResolver topicResolver)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _topicResolver = topicResolver;
        }

        public async Task<int> CreateCollection(string userId, CollectionDto collectionDto)
        {
            var collection = _mapper.Map<Collection>(collectionDto);
            collection.UserId = userId;
            collection.CreatedAt = DateTime.Now;
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

        public async Task EditCollection(int id, CollectionDto updatedCollectionDto)
        {
            var collection = await _dataContext.Collections
                .Include(c => c.Topic)
                .Include(c => c.CustomFields)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (collection == null)
            {
                throw new Exception("Collection not found");
            }

            if (collection.Topic.TopicName != updatedCollectionDto.TopicName)
            {
                collection.Topic = _topicResolver.Resolve(updatedCollectionDto, collection, null, null);
            }

            collection.Title = updatedCollectionDto.Title;
            collection.Description = updatedCollectionDto.Description;

            await UpdateCustomFields(collection, updatedCollectionDto);

            await _dataContext.SaveChangesAsync();
        }

        private async Task UpdateCustomFields(Collection collection, CollectionDto updatedCollectionDto)
        {
            if (updatedCollectionDto.CustomFields != null)
            {
                foreach (var updatedCustomFieldDto in updatedCollectionDto.CustomFields)
                {
                    var existingCustomField = collection.CustomFields
                        .FirstOrDefault(cf => cf.Id == updatedCustomFieldDto.CustomFieldId);

                    if (existingCustomField != null)
                    {
                        existingCustomField.Name = updatedCustomFieldDto.FieldName;
                        existingCustomField.Type = updatedCustomFieldDto.FieldType;
                    }
                    else
                    {
                        var newCustomField = _mapper.Map<CustomField>(updatedCustomFieldDto);
                        collection.CustomFields.Add(newCustomField);
                    }
                }

                var customFieldsToDelete = collection.CustomFields
                    .Where(cf => !updatedCollectionDto.CustomFields
                        .Any(updatedCustomFieldDto => updatedCustomFieldDto.CustomFieldId == cf.Id))
                    .ToList();

                foreach (var customFieldToDelete in customFieldsToDelete)
                {
                    collection.CustomFields.Remove(customFieldToDelete);
                }
            }
        }

        public async Task<CollectionDto> GetCollectionById(int id)
        {
            var collection = await _dataContext.Collections
    .Include(c => c.Topic)
    .Include(c => c.User)
    .Include(c => c.CustomFields)
    .Include(c => c.Items)
        .ThenInclude(i => i.CustomFieldValues)
    .Include(c => c.Items)
        .ThenInclude(i => i.ItemTags)
            .ThenInclude(it => it.Tag)
    .Include(c => c.Items)
        .ThenInclude(i => i.Likes)
    .FirstOrDefaultAsync(c => c.Id == id);


            if (collection == null)
            {
                throw new Exception("Collection not found");
            }

            var collectionDto = _mapper.Map<CollectionDto>(collection);
            return collectionDto;
        }

        public async Task<ICollection<CollectionDto>> GetCollectionsByUserId(string userId)
        {
            var collections = await _dataContext.Collections
                .Include(c => c.User)
                .Include(c => c.Topic)
                .Include(c => c.CustomFields)
                .Include(c => c.Items)
                .ThenInclude(i => i.Likes)
                .Where(i => i.UserId == userId)
                .Select(i => _mapper.Map<CollectionDto>(i))
                .ToListAsync();
            return collections;
        }

        public async Task<ICollection<CollectionDto>> GetAllCollections()
        {
            var collections = await _dataContext.Collections
    .Include(c => c.Topic)
    .Include(c => c.User)
    .Include(c => c.CustomFields)
    .Include(c => c.Items)
        .ThenInclude(i => i.CustomFieldValues)
    .Include(c => c.Items)
        .ThenInclude(i => i.ItemTags)
            .ThenInclude(it => it.Tag)
    .Include(c => c.Items)
        .ThenInclude(i => i.Likes)
                .Select(i => _mapper.Map<CollectionDto>(i))
                .ToListAsync();



            return collections;
        }

        public async Task<ICollection<CollectionDto>> GetLargestCollections(int numberOfCollections)
        {
            var collections = await _dataContext.Collections
                .Include(c => c.Topic)
                .Include(c => c.User)
                .Include(c => c.CustomFields)
                .Include(c => c.Items)
                    .ThenInclude(i => i.CustomFieldValues)
                .Include(c => c.Items)
                .ThenInclude(i => i.ItemTags)
                .ThenInclude(it => it.Tag)
                .Include(c => c.Items)
                .ThenInclude(i => i.Likes)
                .OrderByDescending(c => c.Items.Count)
                .Take(numberOfCollections)
                .ToListAsync();

            var collectionDtos = _mapper.Map<ICollection<CollectionDto>>(collections);

            return collectionDtos;
        }
    }
}
