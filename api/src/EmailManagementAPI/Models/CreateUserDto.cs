namespace EmailManagementAPI.Models
{
    public class CreateUserDto
    {
        public required string Username { get; set; }
        public required string DisplayName { get; set; }
        public required string Role { get; set; }
        public required string Password { get; set; }
    }
}