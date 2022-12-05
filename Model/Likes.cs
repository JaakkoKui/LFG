using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;


namespace LFG.Model
{
	public class Likes
	{
		[NotNull][Required] public Guid likesId { get; set; }
		public int isLike { get; set; }
		public int isDislike { get; set; }
		[NotNull][Required] public string profileId { get; set; }
		public Guid postId { get; set; }
	}
}
