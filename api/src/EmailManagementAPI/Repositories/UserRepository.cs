using System.Linq;
using EmailManagementAPI.Data;
using EmailManagementAPI.Repositories;

namespace EmailManagementAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public object GetUsers()
        {
            return _context.Users
                .Select(u => new
                {
                    u.Username,
                    u.DisplayName,
                    u.Role
                })
                .ToList();
        }
    }
}