using EmailManagementAPI.Repositories;
using EmailManagementAPI.Services;
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
    }
}