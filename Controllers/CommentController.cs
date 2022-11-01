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
    public class CommentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CommentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                        SELECT *
                        FROM
                        Comment
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
                        Comment
                        WHERE postId=@postId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@postId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Comment comment)
        {
            string query = @"
                        INSERT INTO Comment 
                        (CommentContent, Date, CommentingProfile, PostId)
                        VALUES 
                        (@CommentContent, @Date, @CommentingProfile, @PostId);
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@CommentContent", comment.CommentContent);
                    myCommand.Parameters.AddWithValue("@Date", comment.Date);
                    myCommand.Parameters.AddWithValue("@CommentingProfile", comment.CommentingProfile);
                    myCommand.Parameters.AddWithValue("@PostId", comment.PostId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added Successfully!");
        }

        [HttpPut]

        public JsonResult Put(Comment comment)
        {
            string query = @"
                        UPDATE Comment SET
                        CommentContent =@CommentContent,
                        Date =@Date,
                        CommentingProfile =@CommentingProfile
                        PostId =@PostId
                        WHERE Id=@Id;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Id", comment.Id);
                    myCommand.Parameters.AddWithValue("@CommentContent", comment.CommentContent);
                    myCommand.Parameters.AddWithValue("@Date", comment.Date);
                    myCommand.Parameters.AddWithValue("@CommentingProfile", comment.CommentingProfile);
                    myCommand.Parameters.AddWithValue("@PostId", comment.PostId);

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
                        DELETE FROM Comment    
                        WHERE Id=@Id;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);

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
