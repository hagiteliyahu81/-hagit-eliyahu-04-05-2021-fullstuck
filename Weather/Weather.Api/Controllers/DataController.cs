using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Weather.Api.Model;
using Weather.BL;
using Weather.BO;

namespace Weather.Api.Controllers
{
  

    public class DataController : ApiController
    {

        public DataController() { }


        [HttpPost]
        public HttpResponseMessage Test() {
            return Request.CreateResponse(HttpStatusCode.OK, "1");
        }

        [HttpPost]
        public  async Task<HttpResponseMessage> GetAutoCompleteCities(Search search) {
            var cities =  await new DataBL().GetAutoCompleteCities(search.search_txt);
            return Request.CreateResponse(HttpStatusCode.OK, cities);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> GetTemperatureByCity(CityID city)
        {
            var currentemperature = await new DataBL().GetTemperatureByCity(city.city_id);
            return Request.CreateResponse(HttpStatusCode.OK, currentemperature);
        }


    }
}