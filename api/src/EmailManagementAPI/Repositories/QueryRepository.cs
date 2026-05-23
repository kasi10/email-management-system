using EmailManagementAPI.Data;
using EmailManagementAPI.Models;

namespace EmailManagementAPI.Repositories
{
    public class QueryRepository : IQueryRepository
    {
        private readonly AppDbContext _context;

        public QueryRepository(AppDbContext context)
        {
            _context = context;
        }

        public void CreateQuery(Query query)
        {
            _context.Queries.Add(query);

            _context.SaveChanges();
        }

        public void UpdateQuery(Query query)
        {
            _context.Queries.Update(query);

            _context.SaveChanges();
        }
        public List<Query> GetAllQueries()
        {
            return _context.Queries
                .OrderByDescending(q => q.CreatedTs)
                .ToList();
        }

        public List<Query> GetQueriesByTeam(string team)
        {
            return _context.Queries
                .Where(q => q.AssignedTeam == team)
                .OrderByDescending(q => q.CreatedTs)
                .ToList();
        }
        public Query? GetQueryById(int id)
        {
            return _context.Queries.FirstOrDefault(q => q.Id == id);
        }
    }
}