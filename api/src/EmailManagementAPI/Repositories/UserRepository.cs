using System.Linq;
using EmailManagementAPI.Data;
using EmailManagementAPI.Models;

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

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public User GetByUsername(string username)
        {
              return _context.Users.FirstOrDefault(u => u.Username == username);
        }
    }
}