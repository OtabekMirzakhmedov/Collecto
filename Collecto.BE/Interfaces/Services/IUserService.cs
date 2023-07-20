using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserDataDto> GetUserData(string userId);
        Task<List<UserDataDto>> GetAllUsers();
        Task<List<UserDataDto>> MakeUser(string[] userIds);
        Task<List<UserDataDto>> MakeAdmin(string[] userIds);
        Task<List<UserDataDto>> BlockUsers(string[] userIds);
        Task<List<UserDataDto>> UnblockUsers(string[] userIds);
    }
}
