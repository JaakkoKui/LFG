using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model;

public class Game
{
	[Required] public Guid gameId { get; set; }
	[NotNull] [Required] public string gameName { get; set; }
	public string? nicknameInGame { get; set; }
	public int? hoursPlayed { get; set; }
	public string? rank { get; set; }
	public string? server { get; set; }
	public string? comments { get; set; }
	[NotNull] [Required] public string? profileId { get; set; }
}
