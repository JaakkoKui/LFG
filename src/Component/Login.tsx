import React from "react";
import { useStateValue } from "../state/state";
import Register from './Register';
import { SignIn } from '../services/loginService';


interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Login: React.FC = () => {
    const [, dispatch] = useStateValue();
    const [registerForm, showRegister] = React.useState<boolean>(false);

    const openRegister = () => {
        showRegister(true);
    }

    const handleLogin = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.elements.name.value;
        const password = e.currentTarget.elements.password.value;

        SignIn({ Email: email, Password: password });

        dispatch({ type: "LOGIN", payload: email })
        dispatch({ type: "ADD_LOGIN", payload: { Email: email, Password: password } })
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