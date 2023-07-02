
namespace Collecto.BE.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserDataDto> GetUserData(string userId);

    }
}
