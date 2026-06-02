using EmailManagementAPI.Models;
using EmailManagementAPI.Repositories;

namespace EmailManagementAPI.Services
{
    public class RoutingRuleService
        : IRoutingRuleService
    {
        private readonly
            IRoutingRuleRepository
                _routingRuleRepository;

        public RoutingRuleService(
            IRoutingRuleRepository
                routingRuleRepository
        )
        {
            _routingRuleRepository =
                routingRuleRepository;
        }

        public List<RoutingRule> GetRules()
        {
            return _routingRuleRepository
                .GetRules();
        }

        public void AddRule(
            RoutingRule rule
        )
        {
            _routingRuleRepository
                .AddRule(rule);
        }

        public void DeleteRule(int id)
        {
            _routingRuleRepository
                .DeleteRule(id);
        }
    }
}