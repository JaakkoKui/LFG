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

namespace LFG.Controllers
{

	/* Controller for the Profile entity.
	 * Transmits data between models and Frontend.
	*/



	[Route("api/[controller]")]
	[ApiController]
	public class ProfileController : ControllerBase
	{
		private readonly IConfiguration _configuration;

		public ProfileController(IConfiguration configuration)
		{
			_configuration = configuration;
		}


		//Get command for all profiles.

		[HttpGet]
		public async Task<List<Profile>> Get()
		{
			const string query =
				@"SELECT profileId,discordName,nickname,firstName,lastName,age,avatar, DATE_FORMAT(joiningDate,'%Y-%m-%d T%TZ') as joiningDate FROM Profile";

			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

			await using var conn = new MySqlConnection(sqlDataSource);
			await conn.OpenAsync();

			var profiles = new List<Profile>();

			await using var cmd = new MySqlCommand(query, conn);

			var reader = cmd.ExecuteReader();
			while (await reader.ReadAsync())
				profiles.Add(new Profile
				{
					profileId = await reader.GetFieldValueAsync<string>(0),
					discordName = await reader.GetFieldValueAsync<string>(1),
					nickname = await reader.GetFieldValueAsync<string>(2),
					firstName = await reader.GetFieldValueOrNullAsync<string>(3),
					lastName = await reader.GetFieldValueOrNullAsync<string>(4),
					age = await reader.GetFieldValueOrNullAsync<int>(5),
					avatar = await reader.GetFieldValueOrNullAsync<string>(6),
					joiningDate = DateTime.Parse(await reader.GetFieldValueAsync<string>(7))
				});

			await reader.CloseAsync();
			await conn.CloseAsync();

			return profiles;
		}

		//Get command for your users own profile.

		[Authorize]
		[HttpGet("@me")]
		public async Task<Profile> GetMe()
		{
			const string query =
				@"SELECT profileId,discordName,nickname,firstName,lastName,age,avatar, DATE_FORMAT(joiningDate,'%Y-%m-%dT%TZ') as joiningDate FROM Profile WHERE profileId=@profileId";

			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

			await using var conn = new MySqlConnection(sqlDataSource);
			await conn.OpenAsync();

			var profiles = new List<Profile>();

			await using var cmd = new MySqlCommand(query, conn);
			cmd.Parameters.AddWithValue("@profileId",
				HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);

			var reader = cmd.ExecuteReader();

			while (await reader.ReadAsync())
				profiles.Add(new Profile
				{
					profileId = await reader.GetFieldValueAsync<string>(0),
					discordName = await reader.GetFieldValueAsync<string>(1),
					nickname = await reader.GetFieldValueAsync<string>(2),
					firstName = await reader.GetFieldValueOrNullAsync<string>(3),
					lastName = await reader.GetFieldValueOrNullAsync<string>(4),
					age = await reader.GetFieldValueOrNullAsync<int>(5),
					avatar = await reader.GetFieldValueOrNullAsync<string>(6),
					joiningDate = DateTime.Parse(await reader.GetFieldValueAsync<string>(7))
				});

			await reader.CloseAsync();
			await conn.CloseAsync();

			return profiles[0];
		}

		//Get command for a specific profile by ID.

		[HttpGet("{id}")]
		public async Task<Profile> GetById(string id)
		{
			const string query =
				@"SELECT profileId,discordName,nickname,firstName,lastName,age,avatar, DATE_FORMAT(joiningDate,'%Y-%m-%dT%TZ') as joiningDate FROM Profile WHERE profileId=@profileId";

			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");

			await using var conn = new MySqlConnection(sqlDataSource);
			await conn.OpenAsync();

			var profiles = new List<Profile>();

			await using var cmd = new MySqlCommand(query, conn);
			cmd.Parameters.AddWithValue("@profileId", id);

			var reader = cmd.ExecuteReader();

			while (await reader.ReadAsync())
				profiles.Add(new Profile
				{
					profileId = await reader.GetFieldValueAsync<string>(0),
					discordName = await reader.GetFieldValueAsync<string>(1),
					nickname = await reader.GetFieldValueAsync<string>(2),
					firstName = await reader.GetFieldValueOrNullAsync<string>(3),
					lastName = await reader.GetFieldValueOrNullAsync<string>(4),
					age = await reader.GetFieldValueOrNullAsync<int>(5),
					avatar = await reader.GetFieldValueOrNullAsync<string>(6),
					joiningDate = DateTime.Parse(await reader.GetFieldValueAsync<string>(7))
				});

			await reader.CloseAsync();
			await conn.CloseAsync();

			return profiles[0];
		}

		//Put command for editing users own profile.

		[Authorize]
		[HttpPut]
		public JsonResult Put(ProfileDto profile)
		{
			const string query =
				@"UPDATE Profile SET nickname=@nickname, firstName=@firstName, lastName=@lastName, age=@age WHERE profileId=@profileId;";

			var table = new DataTable();
			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
			MySqlDataReader myReader;
			using (var mycon = new MySqlConnection(sqlDataSource))
			{
				mycon.Open();
				using (var myCommand = new MySqlCommand(query, mycon))
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

		//Delete command for deleting users own profile, not implemented.

		[Authorize]
		[HttpDelete]
		public JsonResult Delete()
		{
			const string query = @"DELETE FROM Profile WHERE profileId=@profileId;";

			var table = new DataTable();
			var sqlDataSource = _configuration.GetConnectionString("MySqlDBConnection");
			MySqlDataReader myReader;
			using (var mycon = new MySqlConnection(sqlDataSource))
			{
				mycon.Open();
				using (var myCommand = new MySqlCommand(query, mycon))
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
