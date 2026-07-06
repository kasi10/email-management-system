using EmailManagementAPI.Models;
using EmailManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmailManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly
            IDepartmentService
            _departmentService;

        public DepartmentsController(
            IDepartmentService
                departmentService)
        {
            _departmentService =
                departmentService;
        }

        [HttpGet("all")]
        public async Task<
            ActionResult<IEnumerable<Department>>>
            GetDepartments()
        {
            var departments =
                await _departmentService
                    .GetAllDepartments();

            return Ok(departments);
        }

        [HttpPost("create")]
        public async Task<
            ActionResult<Department>>
            AddDepartment(
                Department department)
        {
            var newDepartment =
                await _departmentService
                    .AddDepartment(department);

            return Ok(newDepartment);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            var deleted =
                _departmentService
                    .DeleteDepartment(id);

            if (!deleted)
            {
                return BadRequest(new
                {
                    message =
                        "Cannot delete department with assigned users"
                });
            }

            return Ok(new
            {
                message =
                    "Department deleted successfully"
            });
        }
    }
}