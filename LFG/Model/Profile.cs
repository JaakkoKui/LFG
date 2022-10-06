using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;

namespace LFG.Model
{
    public class Profile
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Nickname { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string Avatar { get; set; }

        public string DiscordNick { get; set; }

        [Required]
        public string JoiningDate { get; set; }

    }

}