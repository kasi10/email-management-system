using System;
using System.ComponentModel.DataAnnotations;

namespace EmailManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
            = string.Empty;

        [Required]
        [MaxLength(100)]
        public string DisplayName { get; set; }
            = string.Empty;

        // TEMPORARY
        // Keep during migration

        [Required]
        [MaxLength(30)]
        public string Role { get; set; }
            = string.Empty;

        // NEW DEPARTMENT FK

        public int? DepartmentId { get; set; }

        // Navigation Property

        public Department? Department { get; set; }

        [Required]
        [MaxLength(500)]
        public string PasswordHash { get; set; }
            = string.Empty;

        public bool IsActive { get; set; }
            = true;

        public DateTime CreatedTs { get; set; }
            = DateTime.UtcNow;
    }
}