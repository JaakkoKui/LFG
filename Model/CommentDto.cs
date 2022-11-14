using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model;

public class CommentDto
{
	[NotNull] [Required] public string content { get; set; }
	[Required] public string postId { get; set; }
}
