using DeliveryAgent.Entities.Models;

namespace BusinessLogicLayer.IServices
{
    public interface ITimeSlotService
    {
        public Task<IEnumerable<TimeSlot>> GetAllTimeSlots(long? businessId);
        public Task<IEnumerable<TimeSlot>> GetAllActiveTimeSlots(long? businessId);
        public Task<IEnumerable<TimeSlot>?> UpdateMultipleSlotsStatus(List<long> ids, bool isActive);
        public Task<IEnumerable<TimeSlot>> GetByIds(List<long> slotIds);
    }
}
