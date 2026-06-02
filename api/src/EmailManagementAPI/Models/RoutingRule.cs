namespace EmailManagementAPI.Models
{
    public class RoutingRule
    {
        public int Id { get; set; }

        public string Keyword { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public string Priority { get; set; } = string.Empty;
    }
}