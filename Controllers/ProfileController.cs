using LFG.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
            string query =
                @"SELECT profileId,discordName,nickname,firstName,lastName,age,avatar, DATE_FORMAT(joiningDate,'%y-%m-%d') as joiningDate FROM Profile";

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

        [HttpGet("@me")]
        public JsonResult GetMe()
        {
            string query =
                @"SELECT profileId,discordName,nickname,firstName,lastName,age,avatar, DATE_FORMAT(joiningDate,'%y-%m-%d') as joiningDate FROM Profile WHERE profileId=@profileId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader reader;
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                {
                    Console.WriteLine("-- Testi --");
                    Console.WriteLine("-- Testi --");
                    Console.WriteLine("-- Testi --" + HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
                    cmd.Parameters.AddWithValue("@profileId", HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult Get(ulong id)
        {
            string query =
                @"SELECT profileId,discordName,nickname,firstName,lastName,age,avatar, DATE_FORMAT(joiningDate,'%y-%m-%d') as joiningDate FROM Profile WHERE profileId=@profileId";

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

        [Authorize]
        [HttpPut]
        public JsonResult Put(ProfileDto profile)
        {
            string query =
                @"UPDATE Profile SET nickname=@nickname, firstName=@firstName, lastName=@lastName, age=@age WHERE profileId=@profileId;";

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

                    var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                    myCommand.Parameters.AddWithValue("@profileId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Authorize]
        [HttpDelete]
        public JsonResult Delete()
        {
            string query = @"DELETE FROM Profile WHERE profileId=@profileId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
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
