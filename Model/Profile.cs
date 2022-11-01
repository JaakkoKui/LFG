using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;

namespace LFG.Model
{
    public class Profile
    {

        [Required]
        public string email { get; set; }

        [Required]
        public string nickname { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public int age { get; set; }

        public string avatar { get; set; }

        public string discordNick { get; set; }

        [Required]
        public string joiningDate { get; set; }

    }

}