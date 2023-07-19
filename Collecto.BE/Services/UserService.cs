using Collecto.BE.Data;
using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Collecto.BE.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _dataContext;

        public UserService(UserManager<User> userManager, DataContext dataContext)
        {
            _userManager = userManager;
            _dataContext = dataContext;
        }

        public async Task<UserDataDto> GetUserData(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }
            var userData = new UserDataDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            };

            return userData;
        }

        public async Task<List<UserDataDto>> GetAllUsers()
        {
       
            var users = await _userManager.Users.ToListAsync();

            var usersData = new List<UserDataDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                var userData = new UserDataDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    UserRole = roles?.FirstOrDefault(),
                    isActive = user.IsActive
                };

                usersData.Add(userData);
            }

            return usersData;
        }

    }
}
