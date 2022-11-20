using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LFG.Model;
using LFG.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace LFG.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
	private readonly IConfiguration _configuration;

	public GameController(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	[HttpGet]
	public async Task<List<Game>> Get()
	{
		const string query = @"SELECT * FROM Game;";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var games = new List<Game>();

		await using var cmd = new MySqlCommand(query, conn);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			games.Add(new Game
			{
				gameId = await reader.GetFieldValueAsync<Guid>(0),
				gameName = await reader.GetFieldValueAsync<string>(1),
				nicknameInGame = await reader.GetFieldValueOrNullAsync<string>(2),
				hoursPlayed = await reader.GetFieldValueOrNullAsync<int>(3),
				rank = await reader.GetFieldValueOrNullAsync<string>(4),
				server = await reader.GetFieldValueOrNullAsync<string>(5),
				comments = await reader.GetFieldValueOrNullAsync<string>(6),
				profileId = await reader.GetFieldValueOrNullAsync<string>(7)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return games;
	}

	[HttpGet("{id}")]
	public async Task<Game> Get(string id)
	{
		const string query = @"SELECT * FROM Game WHERE gameId=@gameId";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var games = new List<Game>();

		await using var cmd = new MySqlCommand(query, conn);
		cmd.Parameters.AddWithValue("@gameId", id);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			games.Add(new Game
			{
				gameId = await reader.GetFieldValueAsync<Guid>(0),
				gameName = await reader.GetFieldValueAsync<string>(1),
				nicknameInGame = await reader.GetFieldValueOrNullAsync<string>(2),
				hoursPlayed = await reader.GetFieldValueOrNullAsync<int>(3),
				rank = await reader.GetFieldValueOrNullAsync<string>(4),
				server = await reader.GetFieldValueOrNullAsync<string>(5),
				comments = await reader.GetFieldValueOrNullAsync<string>(6),
				profileId = await reader.GetFieldValueOrNullAsync<string>(7)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return games[0];
	}

	[HttpGet("ByUser/{profileId}")]
	public async Task<List<Game>> GetByProfile(string profileId)
	{
		const string query = @"SELECT * FROM Game WHERE profileId=@profileId";

		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

		await using var conn = new MySqlConnection(sqlDataSource);
		await conn.OpenAsync();

		var games = new List<Game>();

		await using var cmd = new MySqlCommand(query, conn);
		cmd.Parameters.AddWithValue("@profileId", profileId);

		var reader = cmd.ExecuteReader();
		while (await reader.ReadAsync())
			games.Add(new Game
			{
				gameId = await reader.GetFieldValueAsync<Guid>(0),
				gameName = await reader.GetFieldValueAsync<string>(1),
				nicknameInGame = await reader.GetFieldValueOrNullAsync<string>(2),
				hoursPlayed = await reader.GetFieldValueOrNullAsync<int>(3),
				rank = await reader.GetFieldValueOrNullAsync<string>(4),
				server = await reader.GetFieldValueOrNullAsync<string>(5),
				comments = await reader.GetFieldValueOrNullAsync<string>(6),
				profileId = await reader.GetFieldValueOrNullAsync<string>(7)
			});

		await reader.CloseAsync();
		await conn.CloseAsync();

		return games;
	}

	[Authorize]
	[HttpPost]
	public JsonResult Post(GameDto game)
	{
		const string query =
			@"INSERT INTO Game (gameId, gameName, nicknameInGame, hoursPlayed, 'rank', 'server', comments, profileId) VALUES (NULL, @gameName, @nicknameInGame, @hoursPlayed, @rank, @server, @comments, @profileId);";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@gameName", game.gameName);
				myCommand.Parameters.AddWithValue("@nicknameInGame", game.nicknameInGame);
				myCommand.Parameters.AddWithValue("@hoursPlayed", game.hoursPlayed);
				myCommand.Parameters.AddWithValue("@rank", game.rank);
				myCommand.Parameters.AddWithValue("@server", game.server);
				myCommand.Parameters.AddWithValue("@comments", game.comments);

				var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
				myCommand.Parameters.AddWithValue("@profileId", id);

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
	public JsonResult Put(int id, GameDto game)
	{
		const string query =
			@"UPDATE Game SET gameName=@gameName, nicknameInGame=@nicknameInGame, hoursPlayed=@hoursPlayed, 'rank'=@rank, 'server'=@server, comments=@comments WHERE gameId=@gameId AND profileId=@profileId;";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@gameId", id);
				myCommand.Parameters.AddWithValue("@gameName", game.gameName);
				myCommand.Parameters.AddWithValue("@nicknameInGame", game.nicknameInGame);
				myCommand.Parameters.AddWithValue("@hoursPlayed", game.hoursPlayed);
				myCommand.Parameters.AddWithValue("@rank", game.rank);
				myCommand.Parameters.AddWithValue("@server", game.server);
				myCommand.Parameters.AddWithValue("@comments", game.comments);

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
		const string query = @"DELETE FROM Game WHERE gameId=@gameId AND profileId=@profileId;";

		var table = new DataTable();
		var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
		MySqlDataReader myReader;
		using (var mycon = new MySqlConnection(sqlDataSource))
		{
			mycon.Open();
			using (var myCommand = new MySqlCommand(query, mycon))
			{
				myCommand.Parameters.AddWithValue("@gameId", id);

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
