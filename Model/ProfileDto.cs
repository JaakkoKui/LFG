using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model
{

	public class ProfileDto
	{
		[NotNull][Required] public string? nickname { get; set; }
		public string? firstName { get; set; }
		public string? lastName { get; set; }
		public int? age { get; set; }
	}
}
