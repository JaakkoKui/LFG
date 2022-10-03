import React from "react";
import { useStateValue } from "../state/state";
import { SignUp } from '../services/loginService';
import { addProfile } from '../services/profileService';
import { ProfileModel } from "../types";

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
    avatar: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export const Register: React.FC<Props> = ({ closeRegister }) => {
    const [, dispatch] = useStateValue();
    const [myAvatar, setAvatar] = React.useState<File>()

    const handleCancel = () => {
        closeRegister(false);
    }
    const handleRegister = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();
        const date = new Date();
        const today = date.getFullYear() +"."+ (date.getMonth()+1) +"."+ date.getDate();
        
        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;
        const username = e.currentTarget.elements.username.value;
        const firstname = e.currentTarget.elements.firstname.value;
        const lastname = e.currentTarget.elements.lastname.value;
        const age = Number(e.currentTarget.elements.age.value);
        const discord = e.currentTarget.elements.discord.value;
        const confirm = e.currentTarget.elements.confirm_password.value;
        //const avatar = new File(e.currentTarget.elements.avatar.value);
        if(myAvatar){
            const avatar = myAvatar;
            console.log(avatar.name);
        }
        
        const newProfile: ProfileModel = {
            Email: email, 
            Nickname: username, 
            FirstName:firstname,
            LastName: lastname, 
            Age: age,
            Avatar:"avatar", 
            DiscordNick: discord,
            JoiningDate: today
        };

        addProfile(newProfile);

        dispatch({
            type: "ADD_PROFILE", payload: newProfile
        });

        SignUp({ Email: email, Password: password, confirmPassword: confirm });

        dispatch({ type: "ADD_LOGIN", payload: { Email: email, Password: password } })
        closeRegister(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        
        const fileList: FileList = e.target.files as FileList;
        console.log(fileList[0]);
        setAvatar(fileList[0]);
    }

    return (
        <div className='h-[95%] w-1/2 mx-auto pt-10'>
            <div className='font-semibold subpixel-antialiased mb-6'>
                REGISTER
            </div>

            <form id='register' onSubmit={handleRegister} className='h-4/5 flex flex-col relative justify-between border-b pt-2 pb-8 border-gray-300'>
                <label>
                    Email:
                    <input name='email'
                    id="email"
                    type="email"
                    placeholder="Write your email"
                    className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>
                <label>
                    Password:
                        <input name='password'
                        id="password"
                        type="password"
                        placeholder="Password"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1'
                        />
                </label>

                <label>
                    Confirm password:
                        <input name='confirm_password'
                        id="confim_password"
                        type="password"
                        placeholder="Confirm Password"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>

                <label>
                    Username:
                        <input
                        name='username'
                        id='username'
                        placeholder="Username"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                </label>

                <div className='flex justify-between'>
                    <label className='w-[49%]'>
                        First name:
                        <input
                            name="firstname"
                            id="firstname"
                            placeholder="First name (optional)"
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>

                    <label className='w-[49%]'>
                        Last name:
                        <input
                            name="lastname"
                            id="lastname"
                            placeholder="Last name (optional)"
                            className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1' />
                    </label>
                </div>

                <label>
                    Age:
                    <input
                        name="age"
                        id="age"
                        type="number"
                        placeholder="Your age (optional)"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1'
                    />
                </label>

                <label>
                    Discord nick:
                    <input
                        name="discord"
                        id="discord"
                        placeholder="Discord nick (optional)"
                        className='w-full border-solid border-2 border-gray-300 rounded-lg py-2 px-4 mt-1'/>
                </label>

                <label>
                    Avatar: 
                    <br/>
                    <input
                        type="file"
                        accept="image/*"
                        multiple={false}
                        id="avatar"
                        name="avatar"
                        onChange={handleChange}
                    />
                </label>

                <button className='rounded-full bg-primary py-2 text-white w-full uppercase font-semibold subpixel-antialiased font-sm mt-2' type='submit'>
                    Register
                </button>

            </form>
        </div>
    );
}

export default Register;