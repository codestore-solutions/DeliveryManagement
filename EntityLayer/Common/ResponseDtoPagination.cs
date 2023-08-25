using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer.Common
{
    public class ResponseDtoPagination
    {
        public object? List { get; set; }
        public int Total { get; set; }
    }
}
