using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using EmailManagementAPI.Data;
using EmailManagementAPI.Models;

using Microsoft.AspNetCore.Authorization;

namespace EmailManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IConfiguration _config;

        public AuthController(
            AppDbContext context,
            IConfiguration config)
        {
            _context = context;

            _config = config;
        }

        // =========================
        // LOGIN
        // =========================

        [HttpPost("login")]
        public IActionResult Login(
            LoginDto dto)
        {
            var user =
                _context.Users
                    .FirstOrDefault(
                        u => u.Username == dto.Username
                    );

            if (user == null)
            {
                return Unauthorized(
                    "Invalid credentials"
                );
            }

            // VERIFY HASHED PASSWORD

            if (!BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash
                ))
            {
                return Unauthorized(
                    "Invalid credentials"
                );
            }

            var token =
                GenerateToken(user);

            return Ok(new
            {
                token,

                role = user.Role,

                departmentId =
                    user.DepartmentId
            });
        }

        // =========================
        // SECURE TEST
        // =========================

        [Authorize(Roles = "Admin")]
        [HttpGet("secure")]
        public IActionResult Secure()
        {
            return Ok(
                "You are authorized 🔐"
            );
        }

        // =========================
        // GENERATE JWT TOKEN
        // =========================

        private string GenerateToken(
            User user)
        {
            var key =
                new SymmetricSecurityKey(

                    Encoding.ASCII.GetBytes(
                        _config["Jwt:Key"]!
                    )
                );

            var creds =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );

            var claims =
                new List<Claim>
                {
                    new Claim(
                        ClaimTypes.Name,
                        user.Username
                    ),

                    new Claim(
                        ClaimTypes.Role,
                        user.Role
                    )
                };

            // ADD DEPARTMENT CLAIM

            if (user.DepartmentId.HasValue)
            {
                claims.Add(

                    new Claim(
                        "DepartmentId",
                        user.DepartmentId
                            .Value
                            .ToString()
                    )
                );
            }

            var token =
                new JwtSecurityToken(

                    issuer:
                        _config["Jwt:Issuer"],

                    audience:
                        _config["Jwt:Audience"],

                    claims:
                        claims,

                    expires:
                        DateTime.UtcNow
                            .AddHours(2),

                    signingCredentials:
                        creds
                );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }

    // =========================
    // LOGIN DTO
    // =========================

    public class LoginDto
    {
        public string? Username { get; set; }

        public string? Password { get; set; }
    }
}