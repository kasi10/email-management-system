using EmailManagementAPI.Data;
using EmailManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmailManagementAPI.Repositories
{
    public class DepartmentRepository
        : IDepartmentRepository
    {
        private readonly AppDbContext _context;

        public DepartmentRepository(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>>
            GetAllDepartments()
        {
            return await _context.Departments
                .ToListAsync();
        }

        public async Task<Department>
            AddDepartment(
                Department department)
        {
            _context.Departments.Add(department);

            await _context.SaveChangesAsync();

            return department;
        }

        
       public bool DeleteDepartment(int id)
        {
            var hasUsers = _context.Users
                .Any(u => u.DepartmentId == id);

            if (hasUsers)
            {
                return false;
            }

            var department = _context.Departments
                .Find(id);

            if (department != null)
            {
                _context.Departments.Remove(department);

                _context.SaveChanges();
            }

            return true;
        }
    }
}