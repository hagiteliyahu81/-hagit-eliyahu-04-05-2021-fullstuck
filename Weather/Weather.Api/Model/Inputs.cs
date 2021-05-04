using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weather.Api.Model
{
    public class Inputs
    {
    }

    public class Search
    {
        public string search_txt { get; set; }
    }

    public class CityID
    {
        public int city_id { get; set; }
    }
}