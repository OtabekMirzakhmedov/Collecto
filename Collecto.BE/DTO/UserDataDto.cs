namespace Collecto.BE.DTO
{
    public class UserDataDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public Boolean isActive { get; set; }
        public string? UserRole { get; set; }
    }
}
