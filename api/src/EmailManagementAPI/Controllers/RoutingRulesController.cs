using Microsoft.AspNetCore.Mvc;

using EmailManagementAPI.Models;
using EmailManagementAPI.Services;

namespace EmailManagementAPI.Controllers
{
    [ApiController]

    [Route("api/[controller]")]
    public class RoutingRulesController
        : ControllerBase
    {
        private readonly
            IRoutingRuleService
                _routingRuleService;

        public RoutingRulesController(
            IRoutingRuleService
                routingRuleService
        )
        {
            _routingRuleService =
                routingRuleService;
        }

        // =====================
        // GET RULES
        // =====================

        [HttpGet]

        public IActionResult GetRules()
        {
            var rules =
                _routingRuleService
                    .GetRules();

            return Ok(rules);
        }

        // =====================
        // ADD RULE
        // =====================

        [HttpPost]

        public IActionResult AddRule(
            RoutingRule rule
        )
        {
            _routingRuleService
                .AddRule(rule);

            return Ok(new
            {
                message =
                    "Routing rule added successfully"
            });
        }

        // =====================
        // DELETE RULE
        // =====================

        [HttpDelete("{id}")]

        public IActionResult DeleteRule(
            int id
        )
        {
            _routingRuleService
                .DeleteRule(id);

            return Ok(new
            {
                message =
                    "Routing rule deleted successfully"
            });
        }
    }
}