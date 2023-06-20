namespace DeliveryAgent.API
{
    public class DeliveryAgentList
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string[] Contacts { get; set; } = null!;
        public string Email { get; set; } = null!;
        public long BusinessAdminId { get; set; }
    }
}
