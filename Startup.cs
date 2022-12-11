using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace LFG;

public class Startup
{
	public Startup(IConfiguration configuration)
	{
		this.configuration = configuration;
	}

	private IConfiguration configuration { get; }

	// This method gets called by the runtime. Use this method to add services to the container.
	public void ConfigureServices(IServiceCollection services)
	{
		// Enable CORS
		services.AddCors(options =>
		{
			options.AddDefaultPolicy(builder =>
			{
				builder
					.WithOrigins("http://localhost:5000", "https://localhost:5001")
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials();
			});
		});

		//JSON Serializer
		services.AddControllersWithViews().AddNewtonsoftJson(options =>
				options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore)
			.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
				= new DefaultContractResolver());

		services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = "Discord";
			})
			.AddCookie()
			.AddOAuth("Discord", options =>
			{
				const string DISCORD_URL = "https://discord.com";
				const string DISCORD_API_URL = "https://discord.com/api";

				options.ClientId = configuration.GetValue<string>("Discord:ClientId");
				options.ClientSecret = configuration.GetValue<string>("Discord:ClientSecret");
				options.CallbackPath = new PathString("/Auth/Callback");

				options.SaveTokens = true;

				options.AuthorizationEndpoint = $"{DISCORD_URL}/oauth2/authorize";
				options.TokenEndpoint = $"{DISCORD_API_URL}/oauth2/token";
				options.UserInformationEndpoint = $"{DISCORD_API_URL}/users/@me";

				options.Scope.Add("identify");

				options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
				options.ClaimActions.MapJsonKey("lfg:discord:username", "username");
				options.ClaimActions.MapJsonKey("lfg:discord:discriminator", "discriminator");
				options.ClaimActions.MapJsonKey("lfg:discord:avatar", "avatar");

				options.ClaimActions.MapJsonKey("lfg:discord:accent_color", "accent_color");
				options.ClaimActions.MapJsonKey("lfg:discord:locale", "locale");

				options.Events = new OAuthEvents
				{
					OnCreatingTicket = async context =>
					{
						var request =
							new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
						request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
						request.Headers.Authorization =
							new AuthenticationHeaderValue("Bearer", context.AccessToken);

						var response = await context.Backchannel.SendAsync(request,
							HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
						response.EnsureSuccessStatusCode();

						var user = JsonDocument.Parse(await response.Content.ReadAsStringAsync()).RootElement;
						context.RunClaimActions(user);
					},
					OnRedirectToAuthorizationEndpoint = context =>
					{
						if (context.Request.Path.Value.StartsWith("/api"))
						{
							context.Response.Clear();
							context.Response.StatusCode = StatusCodes.Status401Unauthorized;
							return Task.CompletedTask;
						}

						context.Response.Redirect(context.RedirectUri);
						return Task.CompletedTask;
					}
				};
			});

		services.AddControllers();

		services.AddSwaggerGen();

		services.AddSpaStaticFiles(configuration => { configuration.RootPath = "dist"; });
	}

	// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

		app.UseHttpsRedirection();

		app.UseRouting();

		app.UseAuthentication();
		app.UseAuthorization();

		app.UseCors();

		app.UseSwagger();
		app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });

		app.UseStaticFiles();
		if (!env.IsDevelopment()) app.UseSpaStaticFiles();

		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
			endpoints.MapControllers();
		});

		app.Use(async (context, next) =>
		{
			if (context.User.Identity.IsAuthenticated)
			{
				var id = Convert.ToUInt64(context.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier)
					.Value);
				var username = context.User.Claims.First(c => c.Type == "lfg:discord:username").Value;
				var discriminator = context.User.Claims.First(c => c.Type == "lfg:discord:discriminator").Value;
				var avatar = context.User.Claims.First(c => c.Type == "lfg:discord:avatar").Value;


				var rawAccentColor = context.User.Claims.First(c => c.Type == "lfg:discord:accent_color").Value;
				var accentColor = rawAccentColor != null ? Convert.ToInt32(rawAccentColor).ToString("X") : null;

				var locale = context.User.Claims.First(c => c.Type == "lfg:discord:locale").Value;

				await using var conn =
					new MySqlConnection(configuration.GetConnectionString("MySqlDBConnection"));
				await conn.OpenAsync();

				var table = new DataTable();
				await using (var cmd = new MySqlCommand(
					             @"SELECT profileId,discordName,avatar,accentColor,locale FROM Profile WHERE profileId=@profileId;",
					             conn))
				{
					cmd.Parameters.AddWithValue("@profileId", id);

					var reader = await cmd.ExecuteReaderAsync();
					table.Load(reader);
					await reader.CloseAsync();
				}

				if (table.Rows.Count == 0)
				{
					await using var cmd = new MySqlCommand(
						@"INSERT INTO Profile (profileId, discordName, nickname, avatar, accentColor, locale) VALUES (@profileId, @discordName, @nickname, @avatar, @accentColor, @locale)",
						conn);

					cmd.Parameters.AddWithValue("@profileId", id);
					cmd.Parameters.AddWithValue("@discordName", $"{username}#{discriminator}");
					cmd.Parameters.AddWithValue("@nickname", $"{username}{discriminator}");
					cmd.Parameters.AddWithValue("@avatar", avatar);

					cmd.Parameters.AddWithValue("@accentColor", accentColor);
					cmd.Parameters.AddWithValue("@locale", locale);

					var reader = await cmd.ExecuteReaderAsync();
					await reader.CloseAsync();
				}
				else
				{
					var obj = table.Rows[0];
					if (avatar != Convert.ToString(obj["avatar"]) || $"{username}#{discriminator}" !=
					    Convert.ToString(obj["discordName"]) || accentColor != Convert.ToString(obj["accentColor"]))
					{
						await using var cmd = new MySqlCommand(
							@"UPDATE Profile SET discordName = @discordName, avatar = @avatar, accentColor = @accentColor WHERE profileId=@profileId",
							conn);

						cmd.Parameters.AddWithValue("@profileId", id);
						cmd.Parameters.AddWithValue("@discordName", $"{username}#{discriminator}");
						cmd.Parameters.AddWithValue("@avatar", avatar);

						cmd.Parameters.AddWithValue("@accentColor", accentColor);

						var reader = await cmd.ExecuteReaderAsync();
						await reader.CloseAsync();
					}
				}

				await conn.CloseAsync();
			}

			await next.Invoke();
		});

		app.UseStaticFiles(new StaticFileOptions
		{
			FileProvider = new PhysicalFileProvider(
				Path.Combine(Directory.GetCurrentDirectory(), "Photos")),
			RequestPath = "/Photos"
		});

		app.UseSpa(builder =>
		{
			builder.Options.SourcePath = ".";

			if (env.IsDevelopment()) builder.UseProxyToSpaDevelopmentServer("https://127.0.0.1:5173");
		});
	}
}
