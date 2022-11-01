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

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
                        SELECT *
                        FROM
                        Game
                        WHERE gameId=@gameId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@gameId", id);
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
                        (gameName, nicknameIngame, hoursPlayed, rank, server, comments, profileId)
                        VALUES 
                        (@gameName, @nicknameIngame, @hoursPlayed, @rank, @server, @comments, @profileId);
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@gameName", game.gameName);
                    myCommand.Parameters.AddWithValue("@nicknameIngame", game.nicknameIngame);
                    myCommand.Parameters.AddWithValue("@hoursPlayed", game.hoursPlayed);
                    myCommand.Parameters.AddWithValue("@rank", game.rank);
                    myCommand.Parameters.AddWithValue("@server", game.server);
                    myCommand.Parameters.AddWithValue("@comments", game.comments);
                    myCommand.Parameters.AddWithValue("@profileId", game.profileId);

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
                        gameName =@gameName,
                        nicknameIngame =@nicknameIngame,
                        hoursPlayed =@hoursPlayed,
                        rank =@rank,
                        server =@server,
                        comments =@comments

                        WHERE gameId=@gameId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@gameId", game.gameId);
                    myCommand.Parameters.AddWithValue("@gameName", game.gameName);
                    myCommand.Parameters.AddWithValue("@nicknameIngame", game.nicknameIngame);
                    myCommand.Parameters.AddWithValue("@hoursPlayed", game.hoursPlayed);
                    myCommand.Parameters.AddWithValue("@rank", game.rank);
                    myCommand.Parameters.AddWithValue("@server", game.server);
                    myCommand.Parameters.AddWithValue("@comments", game.comments);

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
                        WHERE gameId=@gameId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@gameId", id);

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
