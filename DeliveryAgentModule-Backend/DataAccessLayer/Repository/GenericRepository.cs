using DataAccessLayer.Data;
using DataAccessLayer.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccessLayer.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DeliveryDbContext dbContext;
        private DbSet<T> _dbSet;

        public GenericRepository(DeliveryDbContext dbContext)
        {
            this.dbContext = dbContext;
            _dbSet = dbContext.Set<T>();
        }

        public async Task AddAsync(T entity) 
        {
          await _dbSet.AddAsync(entity);   
        }

        public async Task<T> DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if(entity == null) 
            {
                return null;
            }
            _dbSet.Remove(entity);
            return entity;
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Where(expression);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            return entity;
        }

        public async Task<IQueryable<T>> AsQueryableAsync()
        {
            return await Task.FromResult(_dbSet.AsQueryable());
        }

        public T FindInList(Func<T, bool> expression)
        {
            return _dbSet.FirstOrDefault(expression);
        }
    }
}
