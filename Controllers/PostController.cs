using LFG.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.IO;

namespace LFG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public PostController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                        SELECT *
                        FROM
                        Post
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
                        Post
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
        public JsonResult Post(Post post)
        {
            string query = @"
                        INSERT INTO Post 
                        (Title, CreateDate, Content, PosterProfile, PhotoFileName, Likepost, Dislikepost) 
                        VALUES 
                        (@Title, @CreateDate, @Content, @PosterProfile, @PhotoFileName, @Likepost, @Dislikepost);
        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Title", post.Title);
                    myCommand.Parameters.AddWithValue("@CreateDate", post.CreateDate);
                    myCommand.Parameters.AddWithValue("@Content", post.Content);
                    myCommand.Parameters.AddWithValue("@PosterProfile", post.PosterProfile);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", post.PhotoFileName);
                    myCommand.Parameters.AddWithValue("@Likepost", post.Likepost);
                    myCommand.Parameters.AddWithValue("@Dislikepost", post.Dislikepost);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }
    
            return new JsonResult("Added Succesfully");
        }

        [HttpPut]

        public JsonResult Put(Post post)
        {
            string query = @"
                        UPDATE Post SET
                        Title =@Title,
                        CreateDate =@CreateDate,
                        Content =@Content,
                        PosterProfile =@PosterProfile,
                        PhotoFileName =@PhotoFileName,
                        Likepost =@Likepost,
                        Dislikepost =@Dislikepost

                        WHERE PostId=@PostId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@PostId", post.PostId);
                    myCommand.Parameters.AddWithValue("@Title", post.Title);
                    myCommand.Parameters.AddWithValue("@CreateDate", post.CreateDate);
                    myCommand.Parameters.AddWithValue("@Content", post.Content);
                    myCommand.Parameters.AddWithValue("@PosterProfile", post.PosterProfile);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", post.PhotoFileName);
                    myCommand.Parameters.AddWithValue("@Likepost", post.Likepost);
                    myCommand.Parameters.AddWithValue("@Dislikepost", post.Dislikepost);

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
                        DELETE FROM Post    
                        WHERE PostId=@PostId;

            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@PostId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
