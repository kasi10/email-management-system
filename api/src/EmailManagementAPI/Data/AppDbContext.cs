using Microsoft.EntityFrameworkCore;
using EmailManagementAPI.Models;

namespace EmailManagementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        // TABLES

        public DbSet<User> Users { get; set; }

        public DbSet<Query> Queries { get; set; }

        public DbSet<Department> Departments { get; set; }
        public DbSet<RoutingRule> RoutingRules { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder
        )
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // USER CONFIGURATION
            // =========================

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);

                entity.Property(u => u.Username)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasIndex(u => u.Username)
                    .IsUnique();

                entity.Property(u => u.DisplayName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(u => u.Role)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(u => u.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(u => u.IsActive)
                    .HasDefaultValue(true);

                entity.Property(u => u.CreatedTs)
                    .HasDefaultValueSql("GETUTCDATE()");

                // USER → DEPARTMENT

                entity.HasOne(u => u.Department)
                    .WithMany(d => d.Users)
                    .HasForeignKey(u => u.DepartmentId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // =========================
            // DEPARTMENT CONFIGURATION
            // =========================

            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(d => d.DepartmentId);

                entity.Property(d => d.DepartmentName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            // =========================
            // QUERY CONFIGURATION
            // =========================

            modelBuilder.Entity<Query>(entity =>
            {
                entity.HasKey(q => q.Id);

                entity.Property(q => q.SenderEmail)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(q => q.Subject)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(q => q.Body)
                    .IsRequired();

                entity.Property(q => q.CreatedTs)
                    .HasDefaultValueSql("GETUTCDATE()");

                // QUERY → DEPARTMENT

                entity.HasOne(q => q.AssignedDepartment)
                    .WithMany(d => d.Queries)
                    .HasForeignKey(q => q.AssignedDepartmentId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}