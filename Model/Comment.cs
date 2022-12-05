using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model { 

public class Comment
{
	[Required] public Guid commentId { get; set; }
	[NotNull] [Required] public string content { get; set; }
	[Required] public DateTime date { get; set; }
	[NotNull] [Required] public string profileId { get; set; }

	[Required] public Guid postId { get; set; }
}
}
