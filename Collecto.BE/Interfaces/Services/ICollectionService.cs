using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface ICollectionService
    {
        Task<int> CreateCollection(string userId, CollectionDto collectionDto);
        Task<CollectionDto> GetCollectionById(int id);
        Task DeleteCollectionById(int id);
        Task EditCollection(int collectionId, CollectionDto updatedCollectionDto);
        Task<ICollection<CollectionDto>> GetCollectionsByUserId(string userId);
        Task<ICollection<CollectionDto>> GetAllCollections();
    }
}
