using Collecto.BE.Models;

namespace Collecto.BE.Interfaces.Services
{
    public interface ITagService
    {
        Task<IList<Tag>> GetAllTags();
        Task<IList<string>> GetAllTagNames();
    }
}
