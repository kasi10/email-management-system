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
                    u.Id,
                    u.Username,
                    u.DisplayName,
                    u.Role,
                    u.DepartmentId,

                    Department = u.Department != null
                        ? u.Department.DepartmentName
                        : null
                })
                .ToList();
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public User? GetByUsername(string username)
        {
              return _context.Users.FirstOrDefault(u => u.Username == username);
        }
        public void DeleteUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user != null)
            {
                _context.Users.Remove(user);

                _context.SaveChanges();
            }
        }
    }
}