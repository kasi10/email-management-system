using System.Collections.Generic;

namespace EmailManagementAPI.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }
            = string.Empty;

        // One Department
        // → Many Users

        public ICollection<User> Users { get; set; }
            = new List<User>();

        // One Department
        // → Many Queries

        public ICollection<Query> Queries { get; set; }
            = new List<Query>();
    }
}