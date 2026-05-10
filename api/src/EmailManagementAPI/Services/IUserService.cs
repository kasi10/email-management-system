using EmailManagementAPI.Models;

namespace EmailManagementAPI.Services
{
    public interface IUserService
    {
        object GetUsers();

        void CreateUser(CreateUserDto dto);
    }
}