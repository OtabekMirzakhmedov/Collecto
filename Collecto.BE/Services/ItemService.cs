using AutoMapper;
using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;

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
        public async Task<int> CreateItem(int collectionId, ItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);

            item.Collection = await _dataContext.Collections.FindAsync(collectionId);
            _dataContext.Items.Add(item);
            CreateOrUpdateTags(item, itemDto.ItemTags);
            await _dataContext.SaveChangesAsync();
            await HandleCustomFieldValues(item.Id, itemDto.CustomFieldValues);

            return item.Id;
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
                    Item = _dataContext.Items.FirstOrDefault(i => i.Id == itemId),
                    CustomFieldId = customFieldValueDto.CustomFieldId,
                    Value = customFieldValueDto.Value
                };

                _dataContext.CustomFieldValues.Add(customFieldValue);
            }

            await _dataContext.SaveChangesAsync();
        }

    }
}
