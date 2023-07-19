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
            CreateTagsForItem(item, itemDto.ItemTags);
            await _dataContext.SaveChangesAsync();
            await HandleCustomFieldValues(item.Id, itemDto.CustomFieldValues);
            return await GetItemById(item.Id);
        }

        public async Task DeleteItemById(int id)
        {
            var item = _dataContext.Items
                .Include(i => i.CustomFieldValues)
                .Include(i => i.ItemTags)
                .Include(i => i.Comments)
                .Include(i => i.Likes)
                .FirstOrDefault(i => i.Id == id);
            _dataContext.Items.Remove(item);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<ItemDto> EditItem(int itemId, ItemDto updatedItemDto)
        {
            var item = await _dataContext.Items
                .Include(i => i.ItemTags)
                .ThenInclude(it => it.Tag)
                .Include(i => i.CustomFieldValues)
                .ThenInclude(cf => cf.CustomField)
                .FirstOrDefaultAsync(i => i.Id == itemId );

            if (item == null)
            {
                throw new Exception("Item not found");
            }

            item.Name = updatedItemDto.Name;
            UpdateTagsForItem(item, updatedItemDto.ItemTags);
            item.CustomFieldValues =  updatedItemDto.CustomFieldValues.Select(i => _mapper.Map<CustomFieldValue>(i)).ToList();

            await _dataContext.SaveChangesAsync();

            return _mapper.Map<ItemDto>(item);


        }

        public async Task<ICollection<ItemDto>> GetItemsByCollectionId(int collectionId)
        {
            var items = await _dataContext.Items
                .Include(i => i.ItemTags)
                .ThenInclude(it => it.Tag)
                .Include(i => i.CustomFieldValues)
                .ThenInclude(cfv => cfv.CustomField)
                .Where(i => i.Collection.Id == collectionId)
                .ToListAsync();

            var itemDtos = _mapper.Map<ICollection<ItemDto>>(items);
            return itemDtos;
        }

        private void UpdateTagsForItem(Item item, IEnumerable<string> updatedTagNames)
        {
            var currentTagNames = item.ItemTags.Select(it => it.Tag.TagName).ToList();
            var tagNamesToRemove = currentTagNames.Except(updatedTagNames).ToList();
            var tagNamesToAdd = updatedTagNames.Except(currentTagNames).ToList();

            var itemTagsToRemove = item.ItemTags
                .Where(it => tagNamesToRemove.Contains(it.Tag.TagName))
                .ToList();
            itemTagsToRemove.ForEach(it => item.ItemTags.Remove(it));

            foreach (var tagName in tagNamesToAdd)
            {
                var existingTag = _dataContext.Tags.FirstOrDefault(t => t.TagName == tagName);

                if (existingTag != null)
                {
                    if (!item.ItemTags.Any(it => it.TagId == existingTag.Id))
                    {
                        item.ItemTags.Add(new ItemTag { Item = item, Tag = existingTag });
                    }
                }
                else
                {
                    var newTag = new Tag { TagName = tagName };
                    _dataContext.Tags.Add(newTag);
                    item.ItemTags.Add(new ItemTag { Item = item, Tag = newTag });
                }
            }
        }

        private void CreateTagsForItem(Item item, IEnumerable<string> tagNames)
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

        public async Task DeleteGroupOfItemsById(int[] itemIds)
        {
            var items = _dataContext.Items
                .Include(i => i.CustomFieldValues)
                .Include(i => i.ItemTags)
                .Include(i => i.Comments)
                .Include(i => i.Likes)
                .Where(i => itemIds.Contains(i.Id))
                .ToList();

            _dataContext.Items.RemoveRange(items);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<ItemDto> GetItemById(int itemId)
        {
            var item = await _dataContext.Items
                .Include(i => i.Collection)
                .ThenInclude(c => c.User)
                .Include(i => i.Likes)
                .ThenInclude(l => l.User)
                .Include(i => i.ItemTags)
                .ThenInclude(it => it.Tag)
                .Include(i => i.CustomFieldValues)
                .ThenInclude(cfv => cfv.CustomField)
                .FirstOrDefaultAsync(i => i.Id == itemId);

            var itemDto = _mapper.Map<ItemDto>(item);

            return itemDto;
        }
    }
}
