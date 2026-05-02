using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EmailManagementAPI.Services;

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
        [HttpGet]
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
    }
}