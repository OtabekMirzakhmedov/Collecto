using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface ICollectionService
    {
        Task CreateCollection(CollectionDto collectionDto);
    }
}
