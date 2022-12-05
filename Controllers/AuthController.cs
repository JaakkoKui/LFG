using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace LFG.Controllers
{

	[Route("[controller]/[action]")]
	public class AuthController : ControllerBase
	{
		[HttpGet]
		public ActionResult Login()
		{
			return Challenge(new AuthenticationProperties { RedirectUri = "/" }, "Discord");
		}

		[HttpGet]
		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync();
			return Redirect(Url.Content("/"));
		}
	}
}
