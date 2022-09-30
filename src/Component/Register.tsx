import React from "react";
import { useStateValue } from "../state/state";
import { v1 as uuid } from "uuid";
import { SignUp } from '../services/loginService';

interface Props {
    closeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    username: HTMLInputElement;
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    age: HTMLInputElement;
    discord: HTMLInputElement;
    confirm_password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const baseUrl = "https://localhost:44372/api/Auth";

const Register: React.FC<Props> = ({ closeRegister }) => {
    const [, dispatch] = useStateValue();

    const handleCancel = () => {
        closeRegister(false);
    }
    const handleRegister = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const id = uuid();
        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;
        const username = e.currentTarget.elements.username.value;
        const fisrtname = e.currentTarget.elements.firstname.value;
        const lastname = e.currentTarget.elements.lastname.value;
        const age = Number(e.currentTarget.elements.age.value);
        const discord = e.currentTarget.elements.discord.value;
        const confirm = e.currentTarget.elements.confirm_password.value;

        dispatch({
            type: "ADD_PROFILE", payload: {
                Id: id, Nickname: username, FirstName: fisrtname, LastName: lastname,
                Age: age, DiscordNick: discord, Email: email
            }
        })

        SignUp({ email: email, password: password, confirmPassword: confirm });

        dispatch({ type: "ADD_LOGIN", payload: { email: email, password: password } })
        closeRegister(false);
    }

    return (
        <><h1>Register info</h1>
            <form onSubmit={handleRegister}>
                <div>Email: </div><input name='email'
                    id="email"
                    type="email"
                    placeholder="Write your email"
                /><br />
                <div>Password:</div> <input name='password'
                    id="password"
                    type="password"
                    placeholder="Password"
                /><br />
                <div>Confirm password:</div> <input name='confirm_password'
                    id="confim_password"
                    type="password"
                    placeholder="Confirm Password"
                /><br />

                <div>Username:</div> <input name='username' id='username'
                    placeholder="Username" /> <br />

                <div>First name:</div> <input name="firstname"
                    id="firstname" placeholder="First name (optional)" /><br />

                <div>Last name:</div> <input name="lastname"
                    id="lastname" placeholder="Last name (optional)" /> <br />

                <div>Age:</div> <input name="age" id="age" type="number"
                    placeholder="Your age (optional)" width="90%" /> <br />

                <div>Discord nick:</div> <input name="discord" id="discord"
                    placeholder="Discord nick (optional)" /> <br />


                <button type='submit'>Register</button><br />
                <button onClick={handleCancel}>Cancel</button>


            </form>
        </>
    )
}

export default Register;