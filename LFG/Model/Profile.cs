using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace LFG.Model
{ 
public class ProfileRequest
{
    [Required]
    public string Nickname { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public int Age { get; set; }

    [Required]
    public string Avatar { get; set; }

    [Required]
    public string DiscordNick { get; set; }

        [Required]
        public string JoiningDate { get; set; }
    }

public class ProfileResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
}
}