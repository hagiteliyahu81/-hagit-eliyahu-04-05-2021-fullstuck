using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Weather.DAL
{

    public class DBConnect
    {
        private MySqlConnection connection;

        public DBConnect()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["WeatherConn"].ConnectionString;
            connection = new MySqlConnection(connectionString);
        }


        private bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                
                switch (ex.Number)
                {
                    case 0:
                      //  MessageBox.Show("Cannot connect to server.  Contact administrator");
                        break;

                    case 1045:
                    //    MessageBox.Show("Invalid username/password, please try again");
                        break;
                }
                return false;
            }
        }

        //Close connection
        private bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (MySqlException ex)
            {
               // MessageBox.Show(ex.Message);
                return false;
            }
        }

        
        public void InsertTemperatureForCity(int city_id, double temperature,int weather_icon,string weather_text)
        {

            //open connection
            if (this.OpenConnection() == true)
            {
                //create command and assign the query and connection from the constructor
                MySqlCommand cmd = new MySqlCommand();
                cmd.Parameters.AddWithValue("city_id", city_id);
                cmd.Parameters.AddWithValue("temperature", temperature);
                cmd.Parameters.AddWithValue("weather_icon", weather_icon);
                cmd.Parameters.AddWithValue("weather_text", weather_text);
                cmd.CommandText = "sp_insert_temperature";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = this.connection;
                //Execute command
                cmd.ExecuteNonQuery();

                //close connection
                this.CloseConnection();
            }
        }

        public DataTable GetTemperatureByCity(int city_id) {
            //open connection
            if (this.OpenConnection() == true)
            {
               

                using (MySqlCommand cmd = new MySqlCommand("sp_get_last_temperature", this.connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("city_id", city_id);
                    using (MySqlDataAdapter sda = new MySqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        sda.Fill(dt);

                        this.CloseConnection();
                        return dt;
                    }
                }
            }

            return null;
        }
    }
}
