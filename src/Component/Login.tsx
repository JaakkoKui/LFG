import React from "react";
import { useStateValue } from "../state/state";
import Register from './Register';
import { SignIn } from '../services/loginService';


interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export const Login: React.FC = () => {
    const [, dispatch] = useStateValue();
    const [registerForm, showRegister] = React.useState<boolean>(false);

    const openRegister = () => {
        showRegister(true);
    }

    const handleLogin = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;

        SignIn({ Email: email, Password: password });

        dispatch({ type: "LOGIN", payload: email })
        dispatch({ type: "ADD_LOGIN", payload: { Email: email, Password: password } })
        e.currentTarget.elements.password.value = '';
        e.currentTarget.elements.email.value = '';
    }

    return (
        <>
            <div className='w-full h-1/3 pb-7 flex'>
                <img className='mx-auto w-1/4 mt-auto object-contain' src='/images/logo.png' alt='logo' />
            </div>

            <div className='h-[340px] w-1/2 m-auto'>

                <div className='font-semibold subpixel-antialiased mb-6'>
                    LOGIN
                </div>

                {/* Login form */}
                <form id='login' onSubmit={handleLogin} className='h-4/5 flex flex-col relative justify-between border-b pt-2 pb-8 border-gray-300'>
                    <label>
                        E-mail
                        <input name='email' id='email'
                            placeholder='Email'
                            type='name'
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>

                    <label>
                        Password
                        <input name='password' id='password'
                            type='password'
                            placeholder='Password'
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>

                    <button className='rounded-full bg-primary py-2 text-white w-full uppercase font-semibold subpixel-antialiased font-sm mt-2' type='submit'>
                        Login
                    </button>

                    <div className='text-sm absolute -bottom-5 w-full'>
                        <p className='p-1.5 bg-white border-solid border border-gray-300 w-fit rounded-full mx-auto block'>
                            OR
                        </p>
                    </div>
                </form>
                {/* /Login form */}

            </div>
        </>
    );
};

export default Login;