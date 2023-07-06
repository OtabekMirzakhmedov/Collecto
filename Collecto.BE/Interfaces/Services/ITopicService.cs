using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface ITopicService
    {
        Task<IList<string>> GetAllTopics();
    }
}
