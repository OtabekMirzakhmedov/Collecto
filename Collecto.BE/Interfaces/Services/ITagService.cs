namespace Collecto.BE.Interfaces.Services
{
    public interface ITagService
    {
        Task<IList<string>> GetAllTags();
    }
}
