using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model
{

public class PostDto
{
	[NotNull] [Required] public string? title { get; set; }
	[NotNull] [Required] public string? content { get; set; }
	public string? photoFileName { get; set; }
	[Required] public int numberOfComments { get; set; }
}
