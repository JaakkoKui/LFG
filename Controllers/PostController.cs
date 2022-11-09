using LFG.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

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
        public JsonResult GetAll()
        {
            string query = @"SELECT * FROM Post";

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
            string query = @"SELECT * FROM Post WHERE postId=@postId";

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

        [HttpGet]
        [Route("GetPostsByProfile")]
        public JsonResult GetPostsByProfile(int profileId)
        {
            string query = @"SELECT * FROM Post WHERE profileId=@profileId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@profileId", profileId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Authorize]
        [HttpPost]
        public JsonResult Post(PostDto post)
        {
            string query =
                @"INSERT INTO Post (title, content, profileId, photoFileName, likepost, dislikepost, numberOfComments) VALUES (@title, @content, @profileId, @photoFileName, @likepost, @dislikepost, @numberOfComments);";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@title", post.title);
                    myCommand.Parameters.AddWithValue("@content", post.content);
                    myCommand.Parameters.AddWithValue("@photoFileName", post.photoFileName);
                    myCommand.Parameters.AddWithValue("@likepost", post.likepost);
                    myCommand.Parameters.AddWithValue("@dislikepost", post.dislikepost);
                    myCommand.Parameters.AddWithValue("@numberOfComments", post.numberOfComments);

                    var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                    myCommand.Parameters.AddWithValue("@profileId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Added Succesfully");
        }

        [Authorize]
        [HttpPut("{id}")]
        public JsonResult Put(int id, PostDto post)
        {
            string query =
                @"UPDATE Post SET title=@title, content=@content, photoFileName=@photoFileName, likepost=@likepost, dislikepost=@dislikepost numberOfComments=@numberOfComments WHERE postId=@postId AND profileId=@profileId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@postId", id);
                    myCommand.Parameters.AddWithValue("@title", post.title);
                    myCommand.Parameters.AddWithValue("@content", post.content);
                    myCommand.Parameters.AddWithValue("@photoFileName", post.photoFileName);
                    myCommand.Parameters.AddWithValue("@likepost", post.likepost);
                    myCommand.Parameters.AddWithValue("@dislikepost", post.dislikepost);
                    myCommand.Parameters.AddWithValue("@numberOfComments", post.numberOfComments);

                    var profileId = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                    myCommand.Parameters.AddWithValue("@profileId", profileId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Updated Successfully!");
        }

        [Authorize]
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM Post WHERE postId=@postId AND profileId=@profileId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@postId", id);

                    var profileId = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                    myCommand.Parameters.AddWithValue("@profileId", profileId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Deleted Successfully!");
        }

        [Authorize]
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
