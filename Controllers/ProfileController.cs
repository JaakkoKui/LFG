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
                        SELECT profileId,nickname,firstName,lastName,age,avatar,discordNick,email,
                        DATE_FORMAT(joiningDate,'%y-%m-%d') as joiningDate
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

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
                        SELECT profileId,nickname,firstName,lastName,age,avatar,discordNick,email,
                        DATE_FORMAT(joiningDate,'%y-%m-%d') as joiningDate
                        FROM
                        Profile
                        WHERE profileId=@profileId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@profileId", id);
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
                        (nickname, firstName, lastName, age, avatar, discordNick, joiningDate, email) 
                        VALUES 
                        (@nickname, @firstName, @lastName, @age, @avatar, @discordNick, @joiningDate, @email);

        ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@nickname", profile.nickname);
                    myCommand.Parameters.AddWithValue("@firstName", profile.firstName);
                    myCommand.Parameters.AddWithValue("@lastName", profile.lastName);
                    myCommand.Parameters.AddWithValue("@age", profile.age);
                    myCommand.Parameters.AddWithValue("@avatar", profile.avatar);
                    myCommand.Parameters.AddWithValue("@discordNick", profile.discordNick);
                    myCommand.Parameters.AddWithValue("@joiningDate", profile.joiningDate);
                    myCommand.Parameters.AddWithValue("@email", profile.email);

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
                        nickname =@nickname,
                        firstName =@firstName,
                        lastName =@lastName,
                        age =@age,
                        avatar =@avatar,
                        discordNick =@discordNick,
                        joiningDate =@joiningDate

                        WHERE email =@email; 

        ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@nickname", profile.nickname);
                    myCommand.Parameters.AddWithValue("@firstName", profile.firstName);
                    myCommand.Parameters.AddWithValue("@lastName", profile.lastName);
                    myCommand.Parameters.AddWithValue("@age", profile.age);
                    myCommand.Parameters.AddWithValue("@avatar", profile.avatar);
                    myCommand.Parameters.AddWithValue("@discordNick", profile.discordNick);
                    myCommand.Parameters.AddWithValue("@joiningDate", profile.joiningDate);
                    myCommand.Parameters.AddWithValue("@email", profile.email);

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
                        WHERE profileId=@profileId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@profileId", id);                   

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
