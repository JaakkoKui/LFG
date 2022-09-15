import React from "react";

interface Props {
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: React.Dispatch<React.SetStateAction<string>>;
}

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Login: React.FC<Props> = ({ setName, password }) => {

    const handleLogin = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        setName(e.currentTarget.elements.name.value)
        password(e.currentTarget.elements.password.value)
        if (e.currentTarget.elements.name.value !== 'root'
            || e.currentTarget.elements.password.value !== 'root') {
            alert('username or password was invalid');
        }
        e.currentTarget.elements.password.value = '';
        e.currentTarget.elements.name.value = '';
    }

    return (
        <form className='login' onSubmit={handleLogin}>
            <div>
                Login here!
            </div>
            <input name='name' id='name'
                placeholder='enter username'
                className="username" />
            <input name='password' id='password'
                type='password'
                placeholder='enter password'
                className="password" />
            <button className="login_button" type="submit">
                Login
            </button>
        </form>
    );
};

export default Login;