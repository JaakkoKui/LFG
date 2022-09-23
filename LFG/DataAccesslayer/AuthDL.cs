using LFG.Model;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;

namespace LFG.DataAccesslayer
{
    public class AuthDL : IAuthDL
    {
        public readonly IConfiguration _configuration;
        public readonly MySqlConnection _mySqlConnection;
        public AuthDL(IConfiguration configuration)
        {
            _configuration = configuration;
            _mySqlConnection = new MySqlConnection(_configuration["ConnectionStrings:MySqlDBConnection"]);
        }

        public Task<SignInResponse> SignIn(SignInRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SignUpResponse> SignUp(SignUpRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}
