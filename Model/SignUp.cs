using System.ComponentModel.DataAnnotations;

namespace LFG.Model
{
    public class SignUpRequest
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public string confirmPassword { get; set; }

    }

    public class SignUpResponse
    {
        public bool isSuccess { get; set; }
        public string message { get; set; }
    }
}

