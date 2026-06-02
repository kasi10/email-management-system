using EmailManagementAPI.Data;
using EmailManagementAPI.Models;

namespace EmailManagementAPI.Repositories
{
    public class RoutingRuleRepository
        : IRoutingRuleRepository
    {
        private readonly AppDbContext _context;

        public RoutingRuleRepository(
            AppDbContext context
        )
        {
            _context = context;
        }

        public List<RoutingRule> GetRules()
        {
            return _context.RoutingRules
                .ToList();
        }

        public void AddRule(RoutingRule rule)
        {
            _context.RoutingRules
                .Add(rule);

            _context.SaveChanges();
        }

        public void DeleteRule(int id)
        {
            var rule = _context.RoutingRules
                .Find(id);

            if (rule != null)
            {
                _context.RoutingRules
                    .Remove(rule);

                _context.SaveChanges();
            }
        }
    }
}