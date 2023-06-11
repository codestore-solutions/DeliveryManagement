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
        IQueryable<T> GetAll();
        Task<T> GetByIdAsync(long id); 
        public Task AddAsync(T entity);    
        Task<T> DeleteAsync(long id);
        public void Delete(T entity);
    }
}
