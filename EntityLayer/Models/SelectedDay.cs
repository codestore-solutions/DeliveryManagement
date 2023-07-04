using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Models
{
    public class SelectedDay
    {
        public long Id { get; set; }
        public string SelectDay { get; set; } = null!;
        public long ServiceLocationId { get; set; }
        public ServiceLocation ServiceLocation { get; set; } = null!;
    }
}
