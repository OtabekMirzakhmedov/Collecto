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

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
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

        public async Task<List<UserDataDto>> MakeUser(string[] userIds)
        {
            var usersData = new List<UserDataDto>();

            foreach (var userId in userIds)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception($"User with ID '{userId}' not found.");
                }

                var existingRoles = await _userManager.GetRolesAsync(user);
                if (existingRoles.Any())
                {
                    var removeRolesResult = await _userManager.RemoveFromRolesAsync(user, existingRoles);
                    if (!removeRolesResult.Succeeded)
                    {
                        throw new Exception($"Failed to remove existing roles from the user with ID '{userId}'.");
                    }
                }


                var assignRoleResult = await _userManager.AddToRoleAsync(user, "User");
                if (!assignRoleResult.Succeeded)
                {
                    throw new Exception($"Failed to assign 'User' role to the user with ID '{userId}'.");
                }

                var userData = new UserDataDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    UserRole = "User",
                    isActive = user.IsActive
                };

                usersData.Add(userData);
            }

            return usersData;
        }


        public async Task<List<UserDataDto>> MakeAdmin(string[] userIds)
        {
            var usersData = new List<UserDataDto>();

            foreach (var userId in userIds)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception($"User with ID '{userId}' not found.");
                }
                var existingRoles = await _userManager.GetRolesAsync(user);
                if (existingRoles.Any())
                {
                    var removeRolesResult = await _userManager.RemoveFromRolesAsync(user, existingRoles);
                    if (!removeRolesResult.Succeeded)
                    {
                        throw new Exception($"Failed to remove existing roles from the user with ID '{userId}'.");
                    }
                }


                var assignRoleResult = await _userManager.AddToRoleAsync(user, "Admin");
                if (!assignRoleResult.Succeeded)
                {
                    throw new Exception($"Failed to assign 'User' role to the user with ID '{userId}'.");
                }

                var userData = new UserDataDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    UserRole = "Admin",
                    isActive = user.IsActive
                };

                usersData.Add(userData);
            }
            return usersData;
        }


        public async Task<List<UserDataDto>> BlockUsers(string[] userIds)
        {
            var usersData = new List<UserDataDto>();

            foreach (var userId in userIds)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception($"User with ID '{userId}' not found.");
                }

                user.IsActive = false;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    throw new Exception($"Failed to block the user with ID '{userId}'.");
                }
                var roles = await _userManager.GetRolesAsync(user);
                var userData = new UserDataDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    UserRole = roles.FirstOrDefault(), 
                    isActive = false 
                };

                usersData.Add(userData);
            }

            return usersData;
        }

        public async Task<List<UserDataDto>> UnblockUsers(string[] userIds)
        {
            var usersData = new List<UserDataDto>();

            foreach (var userId in userIds)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception($"User with ID '{userId}' not found.");
                }

                user.IsActive = true;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    throw new Exception($"Failed to unblock the user with ID '{userId}'.");
                }

                var roles = await _userManager.GetRolesAsync(user);
                var userData = new UserDataDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    UserRole = roles.FirstOrDefault(),
                    isActive = true
                };

                usersData.Add(userData);
            }

            return usersData;
        }

    }
}
