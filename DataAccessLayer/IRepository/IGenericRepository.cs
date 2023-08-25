using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.IRepository
{
    public interface IGenericRepository<T> where T: class
    {
        IQueryable<T> GetAllAsQueryable();
        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> predicate);
        Task<T?> GetByIdAsync(long id); 
        public Task AddAsync(T entity);
        public Task<bool> AddRangeAsync(IEnumerable<T> entities);
        Task<T?> DeleteAsync(long id);
        public void Delete(T entity);
        public bool DeleteRange(IEnumerable<T> entities);
    }
}
