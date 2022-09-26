import React from "react";
import { useStateValue } from "../state/state";
import Register from './Register';
import axios from 'axios';


const baseUrl = "https://localhost:44372/api/Auth";

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Login: React.FC = () => {
    const [{login}, dispatch] = useStateValue();
    const [registerForm, showRegister] = React.useState<boolean>(false);

    const openRegister = () => {
        showRegister(true);
    }

    console.log("Logged: ", login);
    const handleLogin = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.elements.name.value;
        const password = e.currentTarget.elements.password.value;
        
        const SignIn = async () => {
    
            try{
                const{data: message} = await axios.post(`${baseUrl}/SignIn`, {email:email, password:password})
                console.log(message);
                
                if(message.isSuccess){
                    dispatch({type: "LOGIN", payload: email})
                dispatch({type:"ADD_LOGIN", payload: {email:email, password:password}})
                }
                
            }catch(e: unknown){
                let errorMessage = 'Something went wrong.'
                if (axios.isAxiosError(e) && e.response) {
                    errorMessage += ' Error: ' + e.response.data;
                }
                console.error(errorMessage);
            }
        }
        void SignIn();
       
        e.currentTarget.elements.password.value = '';
        e.currentTarget.elements.name.value = '';
    }

    if (registerForm) {
        return (
            <Register closeRegister={showRegister} />
        )
    }
    return (
        <>
        <form className='login' onSubmit={handleLogin}>
            <div>
                Login here!
            </div>
            <input name='name' id='name'
                placeholder='enter email'
                type='email'
                className="username" />
            <input name='password' id='password'
                type='password'
                placeholder='enter password'
                className="password" />
            <button className="login_button" type="submit">
                Login
            </button>
            </form>
            <button onClick={openRegister}>Register here!</button>
            
        </>
    );
};

export default Login;