using Collecto.BE.DTO;
using Collecto.BE.Models;

namespace Collecto.BE.Interfaces.Services
{
    public interface IItemService
    {
        Task<ItemDto> CreateItem(int collectionId, ItemDto itemDto);
        Task<ICollection<ItemDto>> GetItemsByCollectionId(int collectionId);
        Task DeleteItemById(int id);
        Task<ItemDto> EditItem(int itemId, ItemDto updatedItemDto);
        Task DeleteGroupOfItemsById(int[] itemIds);
        Task<ItemDto> GetItemById(int itemId);
        Task<ICollection<ItemDto>> GetItemsByTagId(int tagId);
        Task<ICollection<ItemDto>> GetLastItems(int numberOfItemsNeeded);
    }
}
