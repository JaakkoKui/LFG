using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LFG.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace LFG.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
	private readonly IConfiguration _configuration;

	public CommentController(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	[HttpGet]
	public async Task<List<Comment>> Get()
	{
		const string query =
			@"SELECT commentId, content, DATE_FORMAT(date,'%Y-%m-%dT%TZ') as date, profileId, postId FROM Comment";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var comments = new List<Comment>();

		await using var cmd = new MySqlCommand(query, conn);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			comments.Add(new Comment
			{
				commentId = await reader.GetFieldValueAsync<Guid>(0),
				content = await reader.GetFieldValueAsync<string>(1),
				date = DateTime.Parse(await reader.GetFieldValueAsync<string>(2)),
				profileId = await reader.GetFieldValueAsync<string>(3),
				postId = await reader.GetFieldValueAsync<Guid>(4)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return comments;
	}

	[HttpGet("GetByPostId/{postId}")]
	public async Task<List<Comment>> GetByPostId(String postId)
	{
		const string query =
			@"SELECT commentId, content, DATE_FORMAT(date,'%Y-%m-%dT%TZ') as date, profileId, postId FROM Comment WHERE postId=@postId";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var comments = new List<Comment>();

		await using var cmd = new MySqlCommand(query, conn);
		cmd.Parameters.AddWithValue("@postId", postId);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			comments.Add(new Comment
			{
				commentId = await reader.GetFieldValueAsync<Guid>(0),
				content = await reader.GetFieldValueAsync<string>(1),
				date = DateTime.Parse(await reader.GetFieldValueAsync<string>(2)),
				profileId = await reader.GetFieldValueAsync<string>(3),
				postId = await reader.GetFieldValueAsync<Guid>(4)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return comments;
	}

	[Authorize]
	[HttpPost]
	public JsonResult Post(CommentDto comment)
	{
		const string query =
			@"INSERT INTO Comment (content, profileId, postId) VALUES (@content, @profileId, @postId);";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@content", comment.content);
				myCommand.Parameters.AddWithValue("@postId", comment.postId);

				var profileId = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
				myCommand.Parameters.AddWithValue("@commentingProfile", profileId);

				myReader = myCommand.ExecuteReader();
				table.Load(myReader);

				myReader.Close();
				mycon.Close();
			}
		}

		return new JsonResult("Added Successfully!");
	}

	[Authorize]
	[HttpPut("{id}")]
	public JsonResult Put(string id, CommentDto comment)
	{
		const string query =
			@"UPDATE Comment SET content=@content, postId=@postId WHERE commentId=@commentId AND profileId=@profileId;";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@commentId", id);
				myCommand.Parameters.AddWithValue("@content", comment.content);
				myCommand.Parameters.AddWithValue("@postId", comment.postId);

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
	public JsonResult Delete(string id)
	{
		const string query = @"DELETE FROM Comment WHERE commentId=@commentId AND profileId=@profileId;";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@commentId", id);

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
}
