using Collecto.BE.DTO;
using Collecto.BE.Interfaces.Services;
using Collecto.BE.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace Collecto.BE.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<UserDataDto> GetUserData(AuthDataDto authDataDto)
        {
            var userId = GetUserIdFromJwtToken(authDataDto.JwtToken);

            User user = await _userManager.FindByIdAsync(userId);

            return new UserDataDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            };



        }

        private string GetUserIdFromJwtToken(string jwtToken)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var token = jwtTokenHandler.ReadJwtToken(jwtToken);

            var userId = token.Claims.FirstOrDefault(claim => claim.Type == "Id")?.Value;

            return userId;
        }

    }
}
