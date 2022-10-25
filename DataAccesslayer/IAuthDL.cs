using LFG.Model;
using System.Threading.Tasks;

namespace LFG.DataAccesslayer
{
    public interface IAuthDL
    {
        public Task<SignUpResponse> SignUp(SignUpRequest request);

        public Task<SignInResponse> SignIn(SignInRequest request);

    }
}
