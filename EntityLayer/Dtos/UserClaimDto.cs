namespace DeliveryAgent.Entities.Dtos
{
    public class UserClaimDto
    {
        public ulong UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
    }
}
