using Microsoft.AspNetCore.Mvc;
using EmailManagementAPI.Models;
using EmailManagementAPI.Services;

namespace EmailManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QueriesController : ControllerBase
    {
        private readonly IQueryService _service;

        public QueriesController(
            IQueryService service)
        {
            _service = service;
        }

        // =========================
        // CREATE QUERY
        // =========================

        [HttpPost]
        public async Task<IActionResult>
            CreateQuery(CreateQueryDto dto)
        {
            try
            {
                await _service.CreateQuery(dto);

                return Ok(new
                {
                    message =
                        "Query submitted successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================
        // ADMIN - ALL QUERIES
        // =========================

        [HttpGet("admin")]
        public IActionResult GetAllQueries()
        {
            try
            {
                var queries =
                    _service.GetAllQueries();

                return Ok(queries);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================
        // MANUAL REVIEW QUEUE
        // =========================

        [HttpGet("manual-review")]
        public IActionResult
            GetManualReviewQueries()
        {
            try
            {
                var queries =
                    _service
                        .GetManualReviewQueries();

                return Ok(queries);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================
        // DEPARTMENT QUERIES
        // =========================

        [HttpGet("department/{departmentId}")]
        public IActionResult
            GetQueriesByDepartment(
                int departmentId
            )
        {
            try
            {
                var queries =
                    _service
                        .GetQueriesByDepartment(
                            departmentId
                        );

                return Ok(queries);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================
        // UPDATE STATUS
        // =========================

        [HttpPatch("{id}/status")]
        public IActionResult UpdateStatus(
            int id,
            UpdateStatusDto dto)
        {
            try
            {
                _service
                    .UpdateQueryStatus(
                        id,
                        dto
                    );

                return Ok(new
                {
                    message =
                        "Status updated successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================
        // MANUAL ROUTING
        // =========================

        [HttpPatch("{id}/manual-route")]
        public IActionResult ManualRoute(
            int id,
            ManualRouteDto dto)
        {
            try
            {
                _service.ManualRouteQuery(
                    id,
                    dto
                );

                return Ok(new
                {
                    message =
                        "Query routed successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        // =========================
        // GET SINGLE QUERY
        // =========================

        [HttpGet("{id}")]
        public IActionResult GetQueryById(
            int id)
        {
            var query =
                _service.GetQueryById(id);

            if (query == null)
            {
                return NotFound(new
                {
                    message =
                        "Query not found"
                });
            }

            return Ok(query);
        }
    }
}