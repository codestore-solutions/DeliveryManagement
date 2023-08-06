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

        public IQueryable<T> GetAllAsQueryable()
        {
            return _dbSet.AsQueryable();
        }
        public async Task<T?> GetByIdAsync(long id)
        {
            var entity = await _dbSet.FindAsync(id);
            if(entity == null)
            {
                return null;
            }
            return entity;
        }
        public async Task AddAsync(T entity) 
        {
          await _dbSet.AddAsync(entity);   
        }
        public async Task<T?> DeleteAsync(long id)
        {
            var entity = await _dbSet.FindAsync(id);
            if(entity == null) 
            {
                return null;
            }
            _dbSet.Remove(entity);
            return entity;
        }
        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

    }
}
