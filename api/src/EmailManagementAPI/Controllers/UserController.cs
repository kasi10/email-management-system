using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EmailManagementAPI.Services;
using EmailManagementAPI.Models;

namespace EmailManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet("all")]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _service.GetUsers();
                return Ok(users);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // 🔥 ADD THIS
        [Authorize]
        [HttpPost("create")]
        public IActionResult CreateUser(CreateUserDto dto)
        {
            try
            {
                _service.CreateUser(dto);
            return Ok(new { message = "User created successfully" });          
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _service.DeleteUser(id);

            return Ok(new
            {
                message = "User deleted successfully"
            });
        }
    }
}