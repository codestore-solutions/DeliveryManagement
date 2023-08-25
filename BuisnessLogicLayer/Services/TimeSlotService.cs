using BusinessLogicLayer.IServices;
using DataAccessLayer.IRepository;
using EntityLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogicLayer.Services
{
    public class TimeSlotService : ITimeSlotService
    {
        private readonly IUnitOfWork unitOfWork;

        public TimeSlotService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<TimeSlot>> GetAllTimeSlots(long? businessId)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository.GetAllAsQueryable().Where(u => (businessId == null) || u.BusinessId == businessId).ToListAsync();
            return timeSlots;
        }

        public async Task<IEnumerable<TimeSlot>> GetAllActiveTimeSlots(long? businessId)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository.GetAllAsQueryable().Where(u =>((businessId == null) || u.BusinessId == businessId) && u.IsActive).ToListAsync();
            return timeSlots;
        }

        public async Task<IEnumerable<TimeSlot>?> UpdateMultipleSlotsStatus(List<long> ids, bool isActive)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository.GetAllAsQueryable().Where(ts => ids.Contains(ts.Id))
            .ToListAsync();
            if(timeSlots.Count == 0)
            {
                return null;
            }
            foreach (var timeSlot in timeSlots)
            {
                timeSlot.IsActive = isActive;
                timeSlot.UpdatedOn = DateTime.Now;
            }
            await unitOfWork.SaveAsync();
            return timeSlots;
        }

        public async Task<IEnumerable<TimeSlot>> GetByIds(List<long> slotIds)
        {
            var timeSlots = await unitOfWork.TimeSlotRepository.GetAllAsQueryable().Where(u => slotIds.Contains(u.Id) && u.IsActive).ToListAsync();
            return timeSlots;
        }
    }
}
