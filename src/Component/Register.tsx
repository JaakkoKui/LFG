import React from "react";
import { useStateValue } from "../state/state";

interface Props {
    closeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Register: React.FC<Props> = ({closeRegister}) => {
    const [state, dispatch] = useStateValue();

    const handleCancel = () => {
        closeRegister(false);
    }
    const handleRegister = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;

        dispatch({type: "ADD_LOGIN", payload:{Email: email, Password:password}})
        closeRegister(false);
    }

    return (
        <><h1>Register info</h1>
        <form onSubmit={handleRegister}>
            <input name='email'
              id="email"
              type="email"
              placeholder="Write your email"
            />
            <input name='password'
              id="password"
              type="password"
              placeholder="Password"
            />
          
            <button onClick={handleCancel}>Cancel</button>
            <button type='submit'>Register</button>
            </form>
        </>
    )
}

export default Register;