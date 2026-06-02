using EmailManagementAPI.Models;

namespace EmailManagementAPI.Services
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>>
            GetAllDepartments();

        Task<Department>
            AddDepartment(
                Department department);

        bool DeleteDepartment(int id);
    }
}