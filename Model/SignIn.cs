using System.ComponentModel.DataAnnotations;

namespace LFG.Model
{
    public class SignInRequest
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }

    }

    public class SignInResponse
    {
        public bool isSuccess { get; set; }

        public string message { get; set; }
    }
}
