using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace LFG.Controllers
{

	[Route("[controller]/[action]")]
	public class AuthController : ControllerBase
	{
		//If login is accessed from client it is authenticated with the discord auth scheme and then the client is redirected to feed
		[HttpGet]
		public ActionResult Login()
		{
			return Challenge(new AuthenticationProperties { RedirectUri = "/" }, "Discord");
		}

		//On logout the cookie is deleted and user is redirected to feed
		[HttpGet]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync();
			return Redirect(Url.Content("/"));
		}
	}
}
