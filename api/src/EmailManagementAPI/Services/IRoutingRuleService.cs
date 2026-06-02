using EmailManagementAPI.Models;

namespace EmailManagementAPI.Services
{
    public interface IRoutingRuleService
    {
        List<RoutingRule> GetRules();

        void AddRule(RoutingRule rule);

        void DeleteRule(int id);
    }
}