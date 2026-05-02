using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmailManagementAPI.Data;
using EmailManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(u =>
            u.Username == dto.Username && u.PasswordHash == dto.Password);

        if (user == null || user.Role != "Admin")
            return Unauthorized("Invalid credentials");

        var token = GenerateToken(user);

        return Ok(new { token });
    }
    [Authorize(Roles = "Admin")]
    [HttpGet("secure")]
    public IActionResult Secure()
    {
        return Ok("You are authorized 🔐");
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
         Encoding.ASCII.GetBytes(_config["Jwt:Key"]!)
    );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class LoginDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}