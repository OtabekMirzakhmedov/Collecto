using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface IItemService
    {
        Task<ItemDto> CreateItem(int collectionId, ItemDto itemDto);
        Task<ICollection<ItemDto>> GetItemsByCollectionId(int collectionId);
        Task DeleteItemById(int id);
        Task<ItemDto> EditItem(int itemId, ItemDto updatedItemDto);
        Task DeleteGroupOfItemsById(int[] itemIds);
    }
}
