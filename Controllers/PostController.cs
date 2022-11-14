﻿using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LFG.Model;
using LFG.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace LFG.Controllers;

[ApiController]
[Route("api/[controller]")]
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
	public async Task<List<Post>> GetAll()
	{
		const string query =
			@"SELECT postId, title, DATE_FORMAT(createDate,'%Y-%m-%dT%TZ') as createDate, content, profileId, photoFileName, numberOfLikes, numberOfDislikes, numberOfComments FROM Post";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var posts = new List<Post>();

		await using var cmd = new MySqlCommand(query, conn);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			posts.Add(new Post
			{
				postId = await reader.GetFieldValueAsync<int>(0),
				title = await reader.GetFieldValueAsync<string>(1),
				createDate = DateTime.Parse(await reader.GetFieldValueAsync<string>(2)),
				content = await reader.GetFieldValueAsync<string>(3),
				profileId = await reader.GetFieldValueAsync<string>(4),
				photoFileName = await reader.GetFieldValueOrNullAsync<string>(5),
				numberOfLikes = await reader.GetFieldValueAsync<int>(6),
				numberOfDislikes = await reader.GetFieldValueAsync<int>(7),
				numberOfComments = await reader.GetFieldValueAsync<int>(8)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return posts;
	}

	[HttpGet("{id}")]
	public async Task<Post> Get(int id)
	{
		const string query =
			@"SELECT postId, title, DATE_FORMAT(createDate,'%Y-%m-%dT%TZ') as createDate, content, profileId, photoFileName, numberOfLikes, numberOfDislikes, numberOfComments FROM Post WHERE postId=@postId";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var posts = new List<Post>();

		await using var cmd = new MySqlCommand(query, conn);
		cmd.Parameters.AddWithValue("@postId", id);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			posts.Add(new Post
			{
				postId = await reader.GetFieldValueAsync<int>(0),
				title = await reader.GetFieldValueAsync<string>(1),
				createDate = DateTime.Parse(await reader.GetFieldValueAsync<string>(2)),
				content = await reader.GetFieldValueAsync<string>(3),
				profileId = await reader.GetFieldValueAsync<string>(4),
				photoFileName = await reader.GetFieldValueOrNullAsync<string>(5),
				numberOfLikes = await reader.GetFieldValueAsync<int>(6),
				numberOfDislikes = await reader.GetFieldValueAsync<int>(7),
				numberOfComments = await reader.GetFieldValueAsync<int>(8)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return posts[0];
	}

	[HttpGet("GetByProfileId/{profileId}")]
	public async Task<List<Post>> GetByProfileId(String profileId)
	{
		const string query =
			@"SELECT postId, title, DATE_FORMAT(createDate,'%Y-%m-%dT%TZ') as createDate, content, profileId, photoFileName, numberOfLikes, numberOfDislikes, numberOfComments FROM Post WHERE profileId=@profileId";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var posts = new List<Post>();

		await using var cmd = new MySqlCommand(query, conn);
		cmd.Parameters.AddWithValue("@profileId", profileId);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			posts.Add(new Post
			{
				postId = await reader.GetFieldValueAsync<int>(0),
				title = await reader.GetFieldValueAsync<string>(1),
				createDate = DateTime.Parse(await reader.GetFieldValueAsync<string>(2)),
				content = await reader.GetFieldValueAsync<string>(3),
				profileId = await reader.GetFieldValueAsync<string>(4),
				photoFileName = await reader.GetFieldValueOrNullAsync<string>(5),
				numberOfLikes = await reader.GetFieldValueAsync<int>(6),
				numberOfDislikes = await reader.GetFieldValueAsync<int>(7),
				numberOfComments = await reader.GetFieldValueAsync<int>(8)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return posts;
	}

	[Authorize]
	[HttpPost]
	public JsonResult Post(PostDto post)
	{
		const string query =
			@"INSERT INTO Post (title, content, profileId, photoFileName, numberOfLikes, numberOfDislikes, numberOfComments) VALUES (@title, @content, @profileId, @photoFileName, @numberOfLikes, @numberOfDislikes, @numberOfComments);";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@title", post.title);
				myCommand.Parameters.AddWithValue("@content", post.content);
				myCommand.Parameters.AddWithValue("@photoFileName", post.photoFileName);
				myCommand.Parameters.AddWithValue("@numberOfLikes", post.numberOfLikes);
				myCommand.Parameters.AddWithValue("@numberOfDislikes", post.numberOfDislikes);
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
		const string query =
			@"UPDATE Post SET title=@title, content=@content, photoFileName=@photoFileName, numberOfLikes=@numberOfLikes, numberOfDislikes=@numberOfDislikes, numberOfComments=@numberOfComments WHERE postId=@postId AND profileId=@profileId;";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@postId", id);
				myCommand.Parameters.AddWithValue("@title", post.title);
				myCommand.Parameters.AddWithValue("@content", post.content);
				myCommand.Parameters.AddWithValue("@photoFileName", post.photoFileName);
				myCommand.Parameters.AddWithValue("@numberOfLikes", post.numberOfLikes);
				myCommand.Parameters.AddWithValue("@numberOfDislikes", post.numberOfDislikes);
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
		const string query = @"DELETE FROM Post WHERE postId=@postId AND profileId=@profileId;";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
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
	[HttpPost("SaveFile")]
	public JsonResult SaveFile()
	{
		try
		{
			var httpRequest = Request.Form;
			var postedFile = httpRequest.Files[0];
			var filename = postedFile.FileName;
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
