using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class TimeSlotService : ITimeSlotService
    {
        private readonly IUnitOfWork unitOfWork;

        public TimeSlotService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<TimeSlot?>> GetAllTimeSlots(long? businessId)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository.GetAllAsQueryable().Where(u => (businessId == null) || u.BusinessId == businessId).ToListAsync();
            return timeSlots;
        }

        public async Task<IEnumerable<TimeSlot?>> GetAllActiveTimeSlots(long? businessId)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository.GetAllAsQueryable().Where(u =>((businessId == null) || u.BusinessId == businessId) && u.IsActive).ToListAsync();
            return timeSlots;
        }

        public async Task<TimeSlot?> UpdateSlotStatus(long id, bool isActive)
        {
            var timeSlot = await unitOfWork.TimeSlotRepository.GetByIdAsync(id);
            if (timeSlot != null)
            {
                timeSlot.IsActive = isActive;
                await unitOfWork.SaveAsync();
            }
            return timeSlot;
        }

        public async Task<IEnumerable<TimeSlot?>> UpdateMultipleSlotsStatus(List<long> ids, bool isActive)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository
                .GetAllAsQueryable()
                .Where(ts => ids.Contains(ts.Id))
                .ToListAsync();

            foreach (var timeSlot in timeSlots)
            {
                timeSlot.IsActive = isActive;
                timeSlot.UpdatedOn = DateTime.Now;
            }
            await unitOfWork.SaveAsync();
            return timeSlots;
        }
    }

}
