using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface ICollectionService
    {
        Task<int> CreateCollection(string userId, CollectionDto collectionDto);

        Task<CollectionDto> GetCollectionById(int id);
    }
}
