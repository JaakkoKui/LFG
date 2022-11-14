using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model;

public class GameDto
{
	[NotNull] [Required] public string? gameName { get; set; }
	public string? nicknameInGame { get; set; }
	public int? hoursPlayed { get; set; }
	public string? rank { get; set; }
	public string? server { get; set; }
	public string? comments { get; set; }
}
