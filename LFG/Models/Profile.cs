using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace LFG.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Nickname { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime?  Age { get; set; }
        public byte[]? Avatar { get; set; }
        public string?  DiscordNick { get; set; }
        public DateTime? JoiningDate { get; set; }

        public Profile()
        {

        }
    }
}
