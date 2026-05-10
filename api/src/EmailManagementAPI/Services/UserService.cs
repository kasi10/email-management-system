using EmailManagementAPI.Models;
using EmailManagementAPI.Repositories;

namespace EmailManagementAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public object GetUsers()
        {
            return _repo.GetUsers();
        }

       public void CreateUser(CreateUserDto dto)
{
    var existingUser = _repo.GetByUsername(dto.Username);

    if (existingUser != null)
    {
        throw new Exception("Username already exists");
    }

    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

   var user = new User
{
    Username = dto.Username,
    DisplayName = dto.DisplayName,
    Role = dto.Role,
    PasswordHash = hashedPassword,
    IsActive = true,
    CreatedTs = DateTime.UtcNow
};

    _repo.AddUser(user);
}
    }
}