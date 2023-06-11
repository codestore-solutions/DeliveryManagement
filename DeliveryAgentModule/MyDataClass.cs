namespace DeliveryAgentModule
{
    public class MyDataClass
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> Contacts { get; set; }= new List<string>();
        public string Role { get; set; }
        public bool IsActive { get; set; }
    }
}
