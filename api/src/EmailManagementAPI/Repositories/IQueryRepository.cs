using EmailManagementAPI.Models;

namespace EmailManagementAPI.Repositories
{
    public interface IQueryRepository
    {
        void CreateQuery(Query query);

        void UpdateQuery(Query query);
        List<Query> GetAllQueries();

        List<Query> GetQueriesByTeam(string team);
        Query? GetQueryById(int id);
    }
}