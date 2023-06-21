using Collecto.BE.DTO;

namespace Collecto.BE.Interfaces.Services
{
    public interface IAuthService
    {
        Task Register(RegisterDto registerDto);
        Task<AuthDataDto> Login(LoginDto loginDto);
    }
}
