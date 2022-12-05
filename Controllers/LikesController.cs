using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LFG.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace LFG.Controllers
{

	/* Controller for the Likes entity.
	 Transmits data between models and Frontend.
	*/

	[ApiController]
	[Route("api/[controller]")]
	public class LikesController : ControllerBase
	{
		private readonly IConfiguration _configuration;

		public LikesController(IConfiguration configuration)
		{
			_configuration = configuration;
		}


		//Get command for all likes, not implemented.

		[HttpGet]
		public async Task<List<Likes>> Get()
		{
			const string query = @"SELECT COUNT(*) FROM Likes";

			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

			await using var conn = new MySqlConnection(sqlDataSource);
			await conn.OpenAsync();

			var like = new List<Likes>();

			await using var cmd = new MySqlCommand(query, conn);

			var reader = cmd.ExecuteReader();
			while (await reader.ReadAsync())
				like.Add(new Likes
				{
					likesId = await reader.GetFieldValueAsync<Guid>(0),
					profileId = await reader.GetFieldValueAsync<string>(1),
					postId = await reader.GetFieldValueAsync<Guid>(2)
				});

			await reader.CloseAsync();
			await conn.CloseAsync();

			return like;
		}

		[HttpGet("GetByPostId/{postId}")]
		public async Task<List<Likes>> GetByPostId(Guid postId)
		{
			const string query =
				@"SELECT COUNT(*) FROM Likes WHERE isLike=1 and postId=@postId";

			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

			await using var conn = new MySqlConnection(sqlDataSource);
			await conn.OpenAsync();

			var like = new List<Likes>();

			await using var cmd = new MySqlCommand(query, conn);
			cmd.Parameters.AddWithValue("@postId", postId);

			var reader = cmd.ExecuteReader();
			while (await reader.ReadAsync())
				like.Add(new Likes
				{
					likesId = await reader.GetFieldValueAsync<Guid>(0),
					profileId = await reader.GetFieldValueAsync<string>(1),
					postId = await reader.GetFieldValueAsync<Guid>(2)
				});

			await reader.CloseAsync();
			await conn.CloseAsync();
			
			return like;
		}

		[Authorize]
		[HttpPost]
		public JsonResult Post(Likes like, int i)
		{
			const string query =
				@"INSERT INTO Likes (likesId, isLike, isDislike, profileId, postId) VALUES (NULL, @isLike, @isDislike, @profileId, @postId);";

			var table = new DataTable();
			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
			MySqlDataReader myReader;
			int isLike;
			int isDislike;
			if (i == 0)
			{
				isLike = 1;
				isDislike = 0;
			}
			else
			{
				isLike = 0;
				isDislike = 1;
			}
				using (var mycon = new MySqlConnection(sqlDataSource))

				{
					mycon.Open();
					using (var myCommand = new MySqlCommand(query, mycon))
					{
						myCommand.Parameters.AddWithValue("@postId", like.postId);
						myCommand.Parameters.AddWithValue("@isLike", isLike);
						myCommand.Parameters.AddWithValue("@isDislike", isDislike);

						var profileId = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
						myCommand.Parameters.AddWithValue("@profileId", profileId);

						myReader = myCommand.ExecuteReader();
						table.Load(myReader);

						myReader.Close();
						mycon.Close();
					}
				}

				return new JsonResult("Added Successfully!");
			}
	}
}
