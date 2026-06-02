using EmailManagementAPI.Models;

namespace EmailManagementAPI.Repositories
{
    public interface IRoutingRuleRepository
    {
        List<RoutingRule> GetRules();

        void AddRule(RoutingRule rule);

        void DeleteRule(int id);
    }
}