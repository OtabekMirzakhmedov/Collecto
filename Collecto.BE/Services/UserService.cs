using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.AspNetCore.Identity;

namespace Collecto.BE.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserDataDto> GetUserData(string userId)
        {
            // Retrieve the user from the UserManager using the user ID
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Map the user data to the UserDataDto object and return it
            var userData = new UserDataDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            };

            return userData;
        }
    }
}
