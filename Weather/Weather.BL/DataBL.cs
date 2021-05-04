using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Weather.BO;
using Weather.DAL;

namespace Weather.BL
{
    public class DataBL
    {
        string domain;
        string key;

        public DataBL() {
             domain = ConfigurationManager.AppSettings["Accu.Wather.Path"].ToString();
             key = ConfigurationManager.AppSettings["Accu.Wather.Key"].ToString();
        }

        public  async Task<List<City>> GetAutoCompleteCities(string search_str) {

            try
            {
                HttpClientHandler httpClientHandler = new HttpClientHandler();
                using (var client = new HttpClient(httpClientHandler))
                {

                    string path = $"{domain}/locations/v1/cities/autocomplete?apikey={key}&q={search_str}";

                    string tmp = await client.GetStringAsync(path);
                    if (string.IsNullOrEmpty(tmp)) { return null; }

                    dynamic citeies = JsonConvert.DeserializeObject(tmp);
                    List<City> result = new List<City>();
                    foreach (var c in citeies) {
                        result.Add(new City()
                        {
                            Id = c["Key"],
                            Name = c["LocalizedName"],
                            Country = c["Country"]["LocalizedName"]
                        });
                    }

                    return result;

                }
            }
            catch (Exception ex) {
                return null;
            }
            
        }


        public async Task<Temperature> GetTemperatureByCity(int city_id)
        {
            try {
                DataTable dt =  new DBConnect().GetTemperatureByCity(city_id);
                if (dt.Rows.Count > 0)
                {
                    if ((DateTime.Parse(dt.Rows[0]["update_date"].ToString()) > DateTime.Now.AddDays(-1))) {
                        return new Temperature()
                        {
                            CurrentTemperature = double.Parse( dt.Rows[0]["temperature"].ToString()),
                            WeatherIcon = int.Parse(dt.Rows[0]["weather_icon"].ToString()),
                            WeatherText = dt.Rows[0]["weather_text"].ToString()
                        };
                    }
                }
                HttpClientHandler httpClientHandler = new HttpClientHandler();
                using (var client = new HttpClient(httpClientHandler))
                {
                    string path = $"{domain}/currentconditions/v1/{city_id}?apikey={key}";


                    string tmp = await client.GetStringAsync(path);
                    if (string.IsNullOrEmpty(tmp)) { return null; }

                    dynamic temp = JsonConvert.DeserializeObject(tmp);
                    
                    Temperature result = new Temperature();
                    string currentTmp = temp[0]["Temperature"]["Metric"]["Value"];
                    result.CurrentTemperature = double.Parse(currentTmp);

                    string icon = temp[0]["WeatherIcon"];
                    result.WeatherIcon = int.Parse(icon);
                    result.WeatherText = temp[0]["WeatherText"];
                    
                    new DAL.DBConnect().InsertTemperatureForCity(city_id, result.CurrentTemperature, result.WeatherIcon, result.WeatherText);

                    return result;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
