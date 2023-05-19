
namespace EntityLayer.Models
{
    public class AgentAssociation
    {
       public int Id { get; set; }  
       public int DeliveryAgentId { get; set; }
       public int BuisnessAdminId { get; set; } 

      public BusinessAdmin? BuisnessAdmin { get; set; }
      public DeliveryAgent? DeliveryAgent { get; set; }
    }
}
