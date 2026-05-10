using EmailManagementAPI.Models;

namespace EmailManagementAPI.Repositories
{
    public interface IUserRepository
    {
        object GetUsers();

        void AddUser(User user);

         User GetByUsername(string username);
    }
}