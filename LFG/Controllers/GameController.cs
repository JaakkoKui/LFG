using LFG.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace LFG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public GameController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                        SELECT *
                        FROM Game;
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

        public JsonResult Post(Game game)
        {
            string query = @"
                        INSERT INTO Game 
                        (GameName, NicknameIngame, HoursPlayed, Rank, Server, Comments, ProfileId)
                        VALUES 
                        (@GameName, @NicknameIngame, @HoursPlayed, @Rank, @Server, @Comments, @ProfileId);
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@GameName", game.GameName);
                    myCommand.Parameters.AddWithValue("@NicknameIngame", game.NicknameIngame);
                    myCommand.Parameters.AddWithValue("@HoursPlayed", game.HoursPlayed);
                    myCommand.Parameters.AddWithValue("@Rank", game.Rank);
                    myCommand.Parameters.AddWithValue("@Server", game.Server);
                    myCommand.Parameters.AddWithValue("@Comments", game.Comments);
                    myCommand.Parameters.AddWithValue("@ProfileId", game.ProfileId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }

        [HttpPut]

        public JsonResult Put(Game game)
        {
            string query = @"
                        UPDATE Game SET
                        GameName =@GameName,
                        NicknameIngame =@NicknameIngame,
                        HoursPlayed =@HoursPlayed,
                        Rank =@Rank,
                        Server =@Server,
                        Comments =@Comments

                        WHERE GameId=@GameId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@GameId", game.GameId);
                    myCommand.Parameters.AddWithValue("@GameName", game.GameName);
                    myCommand.Parameters.AddWithValue("@NicknameIngame", game.NicknameIngame);
                    myCommand.Parameters.AddWithValue("@HoursPlayed", game.HoursPlayed);
                    myCommand.Parameters.AddWithValue("@Rank", game.Rank);
                    myCommand.Parameters.AddWithValue("@Server", game.Server);
                    myCommand.Parameters.AddWithValue("@Comments", game.Comments);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Updated Successfully!");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                        DELETE FROM Game    
                        WHERE GameId=@GameId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@GameId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }
    }
}
