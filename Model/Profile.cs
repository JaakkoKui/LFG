using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model;

public class Profile
{
	[NotNull] [Required] public string? profileId { get; set; }

	[NotNull] [Required] public string? discordName { get; set; }

	[NotNull] [Required] public string? nickname { get; set; }

	public string? firstName { get; set; }

	public string? lastName { get; set; }

	public int? age { get; set; }

	public string? avatar { get; set; }

	[Required] public DateTime joiningDate { get; set; }
}
