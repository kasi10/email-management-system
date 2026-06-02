using EmailManagementAPI.Models;

namespace EmailManagementAPI.Repositories
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetAllDepartments();

        Task<Department> AddDepartment(Department department);

        bool DeleteDepartment(int id);
    }
}