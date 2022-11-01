using LFG.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Data.Common;
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

        

        public async Task<SignInResponse> SignIn(SignInRequest request)
        {
            SignInResponse response = new SignInResponse(); ;
            response.isSuccess = true;
            response.message = "Succesful";
            try
            {                

                if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }

                string SqlQuery = @"SELECT * FROM User WHERE email=@email AND password=@password;";

                using (MySqlCommand sqlCommand = new MySqlCommand(SqlQuery, _mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@email", request.email);
                    sqlCommand.Parameters.AddWithValue("@password", request.password);
                    
                    using(DbDataReader dataReader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if(dataReader.HasRows)
                        {
                            response.message = "Login Successful";
                        }
                        else
                        {
                            response.isSuccess = false;
                            response.message = "Login Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
            }
            finally
            {
                await _mySqlConnection.CloseAsync();
                await _mySqlConnection.DisposeAsync();
            }

            return response;
        }

        public async Task<SignUpResponse> SignUp(SignUpRequest request)
        {
            SignUpResponse response = new SignUpResponse(); ;
            response.isSuccess = true;
            response.message = "Succesful";
            try
            {

                if(!request.password.Equals(request.confirmPassword))
                {
                    response.isSuccess = false;
                    response.message = "Password and confirm password not match!";
                    return response;
                }

                if(_mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await _mySqlConnection.OpenAsync();
                }

                string SqlQuery = @"insert into User (email, password) Values (@email, @password)";

                using(MySqlCommand sqlCommand = new MySqlCommand(SqlQuery, _mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@email", request.email);
                    sqlCommand.Parameters.AddWithValue("@password", request.password);
                    int Status = await sqlCommand.ExecuteNonQueryAsync();
                    if (Status <= 0)
                    {
                        response.isSuccess = false;
                        response.message = "Something Went Wrong";
                        return response;
                    }
                }
            } 
            catch(Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
            }
            finally
            {
                await _mySqlConnection.CloseAsync();
                await _mySqlConnection.DisposeAsync();
            }

            return response;
        }        
    }
}
