using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Weather.BO
{
    public class Temperature
    {
        public double CurrentTemperature { get; set; }

        public int WeatherIcon { get; set; }

        public string WeatherText { get; set; }
    }
}
