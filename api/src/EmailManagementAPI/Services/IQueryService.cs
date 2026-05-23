using EmailManagementAPI.Models;

namespace EmailManagementAPI.Services
{
    public interface IQueryService
    {
        // =========================
        // CREATE QUERY
        // =========================

        Task CreateQuery(
            CreateQueryDto dto
        );

        // =========================
        // ALL QUERIES
        // =========================

        List<Query> GetAllQueries();

        // =========================
        // DEPARTMENT QUERIES
        // =========================

        List<Query>
            GetQueriesByDepartment(
                int departmentId
            );

        // =========================
        // MANUAL REVIEW
        // =========================

        List<Query>
            GetManualReviewQueries();

        // =========================
        // MANUAL ROUTING
        // =========================

        void ManualRouteQuery(
            int id,
            ManualRouteDto dto
        );

        // =========================
        // STATUS UPDATE
        // =========================

        void UpdateQueryStatus(
            int id,
            UpdateStatusDto dto
        );

        // =========================
        // SINGLE QUERY
        // =========================

        Query? GetQueryById(int id);
    }
}