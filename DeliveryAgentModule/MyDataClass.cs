namespace DeliveryAgentModule
{

    public class DataClass
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> Contacts { get; set; } = new List<string>();
        public string BusinessCategory { get; set; } 
        public string Role { get; set; }
        public bool IsActive { get; set; }
    }


    public class MyDataClass
    {

        public int StatusCode { get; set; }
        public bool Success { get; set; }
        public List<DataClass> Data { get; set; }
        public string Message { get; set; }
      
    }
}
