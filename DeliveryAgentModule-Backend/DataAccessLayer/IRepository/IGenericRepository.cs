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
        public Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id); 
        public Task AddAsync(T entity);    
        Task<T> DeleteAsync(int id);
        IEnumerable<T> Find(Expression<Func<T, bool>> expression);
        IQueryable<T> AsQueryable();
    }
}
