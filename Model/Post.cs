using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LFG.Model;

public class Post
{
	[Required] public Guid postId { get; set; }
	[NotNull] [Required] public string? title { get; set; }
	[Required] public DateTime createDate { get; set; }
	[NotNull] [Required] public string? content { get; set; }
	[NotNull] [Required] public string? profileId { get; set; }
	public string? photoFileName { get; set; }
	[Required] public int numberOfLikes { get; set; }
	[Required] public int numberOfDislikes { get; set; }
	[Required] public int numberOfComments { get; set; }
}
