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

}