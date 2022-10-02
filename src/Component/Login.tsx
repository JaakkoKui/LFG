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
        <div className='flex flex-row h-screen overflow-clip'>
            <div className='basis-2/3 bg-darkBackground relative'>
                {/* Graphic divs (WIP) */}
                <div className='absolute h-[700px] w-[700px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rotate-45 -right-32 -top-1/3 z-10'>
                    <div className='absolute h-[670px] w-[670px] bg-darkBackground'></div>
                </div>
                <div className='absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50 rotate-45 -right-52 -top-1/2'>
                    <div className='absolute h-[970px] w-[1070px] bg-darkBackground'></div>
                </div>
                <div className='absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50 -rotate-45 -left-[734px] -bottom-1/4 z-10'>
                    <div className='absolute h-[970px] w-[1070px] bg-darkBackground'></div>
                </div>
                <div className='absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 -rotate-45 -left-[550px] -bottom-1/4'>
                    <div className='absolute h-[1070px] w-[1070px] bg-darkBackground'></div>
                </div>
                {/* /Graphic divs */}
            </div>
            <div className='basis-1/3 flex flex-col bg-white shadow-lg z-10'>
                <div className='fixed w-1/3 h-1/3 flex'>
                    <img className='mx-auto w-1/4 mt-auto object-contain' src='/images/logo.png' alt='logo' />
                </div>
                {/* Login section */}
                <div className='h-1/4 w-1/2 m-auto'>
                    <div className='font-semibold subpixel-antialiased mb-6'>
                        LOGIN
                    </div>
                    {/* Login form */}
                    <form id='login' onSubmit={handleLogin} className='h-4/5 flex flex-col relative justify-between border-b pt-2 pb-8 border-gray-300'>
                        <label>
                            E-mail
                            <input name='name' id='name'
                                placeholder='Email'
                                type='email'
                                className='w-full border-solid border-2 border-gray-300 rounded-lg py-1 px-2 mt-1' />
                        </label>

                        <label>
                            Password
                            <input name='password' id='password'
                                type='password'
                                placeholder='Password'
                                className='w-full border-solid border-2 border-gray-300 rounded-lg py-1 px-2 mt-1' />
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

                    {/* Register button */}
                    <button id='registerButton' onClick={openRegister} className='p-8 w-full text-center block uppercase font-semibold subpixel-antialiased font-sm text-gray-700' >Register here</button>
                    {/* /Register button */}


                </div>
                {/* /Login section */}
            </div>
        </div>
    );
};

export default Login;