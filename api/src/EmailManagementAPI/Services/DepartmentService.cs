using EmailManagementAPI.Models;
using EmailManagementAPI.Repositories;

namespace EmailManagementAPI.Services
{
    public class DepartmentService
        : IDepartmentService
    {
        private readonly
            IDepartmentRepository
            _departmentRepository;

        public DepartmentService(
            IDepartmentRepository
                departmentRepository)
        {
            _departmentRepository =
                departmentRepository;
        }

        public async Task<IEnumerable<Department>>
            GetAllDepartments()
        {
            return await
                _departmentRepository
                    .GetAllDepartments();
        }

        public async Task<Department>
            AddDepartment(
                Department department)
        {
            return await
                _departmentRepository
                    .AddDepartment(department);
        }

        public bool DeleteDepartment(int id)
        {
            return _departmentRepository
                .DeleteDepartment(id);
        }
    }
}