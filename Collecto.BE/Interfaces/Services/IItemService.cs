using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface IItemService
    {
        Task<int> CreateItem(int collectionId, ItemDto itemDto);
    }
}
