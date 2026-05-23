using EmailManagementAPI.Models;
using EmailManagementAPI.Repositories;
using EmailManagementAPI.Services.AI;
using System.Text.Json;

namespace EmailManagementAPI.Services
{
    public class QueryService : IQueryService
    {
        private readonly IQueryRepository _repo;

        private readonly AIClassificationService _aiService;

        public QueryService(
            IQueryRepository repo,
            AIClassificationService aiService)
        {
            _repo = repo;

            _aiService = aiService;
        }

        // =========================
        // CREATE QUERY
        // =========================

        public async Task CreateQuery(
            CreateQueryDto dto)
        {
            // SAVE QUERY FIRST

            var query = new Query
            {
                SenderEmail =
                    dto.SenderEmail,

                Subject =
                    dto.Subject,

                Body =
                    dto.Body,

                CreatedTs =
                    DateTime.UtcNow,

                Status =
                    "Pending Classification",

                IsClassified =
                    false
            };

            _repo.CreateQuery(query);

            // RUN AI

            var result =
                await _aiService
                    .ClassifyQuery(query);

            // AI FAILURE

            if (result == null)
            {
                query.Status =
                    "Needs Manual Review";

                query.NeedsManualReview =
                    true;

                _repo.UpdateQuery(query);

                return;
            }

            // MAP DEPARTMENT NAME → ID

            var departmentId =
                await _aiService
                    .GetDepartmentId(
                        result.Department
                    );

            // UPDATE QUERY

            query.Category =
                result.Category;

            query.Priority =
                result.Priority;

            query.AssignedTeam =
                result.Department;

            query.AssignedDepartmentId =
                departmentId;

            query.ConfidenceScore =
                result.ConfidenceScore;

            query.IsClassified =
                true;

            query.ClassifiedAt =
                DateTime.UtcNow;

            query.AiResponseRaw =
                JsonSerializer.Serialize(result);

            // MANUAL REVIEW

            query.NeedsManualReview =
                result.NeedsManualReview;

            if (result.NeedsManualReview)
            {
                query.Status =
                    "Needs Manual Review";
            }
            else
            {
                query.Status =
                    "Assigned";
            }

            _repo.UpdateQuery(query);
        }

        // =========================
        // ALL QUERIES
        // =========================

        public List<Query> GetAllQueries()
        {
            return _repo.GetAllQueries();
        }

        // =========================
        // DEPARTMENT QUERIES
        // =========================

        public List<Query>
            GetQueriesByDepartment(
                int departmentId
            )
        {
            return _repo
                .GetAllQueries()
                .Where(q =>

                    q.AssignedDepartmentId
                        == departmentId
                )
                .ToList();
        }

        // =========================
        // MANUAL REVIEW QUEUE
        // =========================

        public List<Query>
            GetManualReviewQueries()
        {
            return _repo
                .GetAllQueries()
                .Where(q =>
                    q.NeedsManualReview
                )
                .ToList();
        }

        // =========================
        // MANUAL ROUTING
        // =========================

        public void ManualRouteQuery(
            int id,
            ManualRouteDto dto)
        {
            var query =
                _repo.GetQueryById(id);

            if (query == null)
            {
                throw new Exception(
                    "Query not found"
                );
            }

            query.AssignedDepartmentId =
                dto.DepartmentId;

            query.NeedsManualReview =
                false;

            query.Status =
                "Assigned";

            // OPTIONAL:
            // Update AssignedTeam text

            if (dto.DepartmentId == 1)
            {
                query.AssignedTeam =
                    "IRSNotices";
            }
            else if (dto.DepartmentId == 2)
            {
                query.AssignedTeam =
                    "DocCollections";
            }

            _repo.UpdateQuery(query);
        }

        // =========================
        // STATUS UPDATE
        // =========================

        public void UpdateQueryStatus(
            int id,
            UpdateStatusDto dto)
        {
            var query =
                _repo.GetQueryById(id);

            if (query == null)
            {
                throw new Exception(
                    "Query not found"
                );
            }

            query.Status = dto.Status;

            _repo.UpdateQuery(query);
        }

        // =========================
        // SINGLE QUERY
        // =========================

        public Query? GetQueryById(int id)
        {
            return _repo.GetQueryById(id);
        }
    }
}