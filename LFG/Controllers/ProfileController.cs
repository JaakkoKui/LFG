using LFG.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Configuration;
using System.Data;
using MySql.Data.MySqlClient;

namespace LFG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProfileController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                        SELECT ProfileId,Nickname,FirstName,LastName,Age,Avatar,DiscordNick,Email,
                        DATE_FORMAT(JoiningDate,'%y-%m-%d') as JoiningDate
                        FROM
                        Profile
        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Profile profile)
        {
            string query = @"
                        INSERT INTO Profile 
                        (Nickname, FirstName, LastName, Age, Avatar, DiscordNick, JoiningDate, Email) 
                        VALUES 
                        (@Nickname, @FirstName, @LastName, @Age, @Avatar, @DiscordNick, @JoiningDate, @Email);

        ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Nickname", profile.Nickname);
                    myCommand.Parameters.AddWithValue("@FirstName", profile.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", profile.LastName);
                    myCommand.Parameters.AddWithValue("@Age", profile.Age);
                    myCommand.Parameters.AddWithValue("@Avatar", profile.Avatar);
                    myCommand.Parameters.AddWithValue("@DiscordNick", profile.DiscordNick);
                    myCommand.Parameters.AddWithValue("@JoiningDate", profile.JoiningDate);
                    myCommand.Parameters.AddWithValue("@Email", profile.Email);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);

        }


        [HttpPut]
        public JsonResult Put(Profile profile)
        {
            string query = @"
                        UPDATE Profile SET
                        Nickname =@Nickname,
                        FirstName =@FirstName,
                        LastName =@LastName,
                        Age =@Age,
                        Avatar =@Avatar,
                        DiscordNick =@DiscordNick,
                        JoiningDate =@JoiningDate,
                        Email =@Email
                        WHERE ProfileId=@ProfileId;
                        

        ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Nickname", profile.Nickname);
                    myCommand.Parameters.AddWithValue("@FirstName", profile.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", profile.LastName);
                    myCommand.Parameters.AddWithValue("@Age", profile.Age);
                    myCommand.Parameters.AddWithValue("@Avatar", profile.Avatar);
                    myCommand.Parameters.AddWithValue("@DiscordNick", profile.DiscordNick);
                    myCommand.Parameters.AddWithValue("@JoiningDate", profile.JoiningDate);
                    myCommand.Parameters.AddWithValue("@Email", profile.Email);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);

        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                        DELETE FROM Profile
                        WHERE ProfileId=@ProfileId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@ProfileId", id);                   

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);

        }

    }
}
