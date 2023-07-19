using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserDataDto> GetUserData(string userId);
        public Task<List<UserDataDto>> GetAllUsers();

    }
}
