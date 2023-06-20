using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class Business
    {
        [Key]
        public long Id { get; set; }
      //  public List<AssignDeliveryAgent> DeliveryAgents { get; set; } = new List<AssignDeliveryAgent>();

    }
}
