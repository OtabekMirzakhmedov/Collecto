using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class ItemService : IItemService
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public ItemService(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        public async Task<ItemDto> CreateItem(int collectionId, ItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);

            item.Collection = await _dataContext.Collections.FindAsync(collectionId);
            item.CreatedAt = DateTime.Now;
            _dataContext.Items.Add(item);
            CreateOrUpdateTags(item, itemDto.ItemTags);
            await _dataContext.SaveChangesAsync();
            await HandleCustomFieldValues(item.Id, itemDto.CustomFieldValues);

            return _mapper.Map<ItemDto>(item);
        }

        public async Task DeleteItemById(int id)
        {
            var item = _dataContext.Items
                .Include(i => i.CustomFieldValues)
                .Include(i => i.ItemTags)
                .FirstOrDefault(i => i.Id == id);
            _dataContext.Items.Remove(item);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<ICollection<ItemDto>> GetItemsByCollectionId(int collectionId)
        {
            var items = await _dataContext.Items
                .Include(i => i.ItemTags)
                .ThenInclude(it => it.Tag)
                .Include(i => i.CustomFieldValues)
                .Where(i => i.Collection.Id == collectionId)
                .ToListAsync();

            var itemDtos = _mapper.Map<ICollection<ItemDto>>(items);
            return itemDtos;
        }

        private void CreateOrUpdateTags(Item item, IEnumerable<string> tagNames)
        {
            foreach (var tagName in tagNames)
            {
                var tag = _dataContext.Tags.FirstOrDefault(t => t.TagName == tagName);

                if (tag == null)
                {
                    tag = new Tag { TagName = tagName };
                    _dataContext.Tags.Add(tag);
                }

                _dataContext.ItemTags.Add(new ItemTag { Item = item, Tag = tag });
            }
        }

        private async Task HandleCustomFieldValues(int itemId, IEnumerable<CustomFieldValueDto>? customFieldValues)
        {
            foreach (var customFieldValueDto in customFieldValues)
            {
                var customFieldValue = new CustomFieldValue
                {
                    ItemId = itemId,
                    CustomFieldId = customFieldValueDto.CustomFieldId,
                    Value = customFieldValueDto.Value
                };

                _dataContext.CustomFieldValues.Add(customFieldValue);
                
            }
            await _dataContext.SaveChangesAsync();

        }

    }
}
