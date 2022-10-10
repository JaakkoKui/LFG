import React from "react";
import { updateProfile } from "../services/profileService";
import { editUser } from "../services/userService";
import { useStateValue } from "../state/state";
import { ProfileModel, User } from "../types";

interface FormElements extends HTMLFormControlsCollection {
    password: HTMLInputElement;
    username: HTMLInputElement;
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    age: HTMLInputElement;
    discord: HTMLInputElement;
    confirm_password: HTMLInputElement;
    avatar: HTMLInputElement;
    currentPassword: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface Props {
    currentUser: ProfileModel;
    toggleForm: () => void;
}

const EditProfileForm: React.FC<Props> = ({ currentUser, toggleForm }) => {
    const [editPassword, toggleEdit] = React.useState<boolean>(false);
    const [{ user }] = useStateValue();

    const thisUser = Object.values(user).find(u => u.Email === currentUser.Email) as User

    const togglePasswordEdit = () => {
        toggleEdit(!editPassword);
    }

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const username = e.currentTarget.elements.username.value;
        const firstname = e.currentTarget.elements.firstname.value;
        const lastname = e.currentTarget.elements.lastname.value;
        const age = Number(e.currentTarget.elements.age.value);
        const discord = e.currentTarget.elements.discord.value;

        const editedProfile: ProfileModel = {
            Nickname: username,
            FirstName: firstname,
            LastName: lastname,
            Age: age,
            DiscordNick: discord,
            Email: currentUser.Email,
            JoiningDate: currentUser.JoiningDate
        }

        const currentPassword = e.currentTarget.elements.currentPassword.value;
        const password = e.currentTarget.elements.password.value;
        const confirmPassword = e.currentTarget.elements.confirm_password.value;

        if (currentPassword !== thisUser.Password && currentPassword.length !== 0) {
            window.alert("Your password wasn't correct!");
        } else if (password !== confirmPassword) {
            window.alert("Password and confirm password didn't match!");
        }
        else if (password.length !== 0) {

            const newPassword: User = {
                Email: currentUser.Email,
                Password: password,
                confirmPassword: confirmPassword
            }

            editUser(newPassword);
        }

        updateProfile(editedProfile);
        window.location.reload();
        toggleForm();
    }

    return (
        <><button onClick={togglePasswordEdit}>Set new password</button><br />
            <form onSubmit={handleSubmit}>

                <br /><div>{editPassword && <div><label>Current Password: <input type="password" id="currentPassword" name="currentPassword" placeholder="Current password" /></label><br />
                    <label>New Password: <input type="password" id="password" name="password" placeholder="New password" /></label><br />
                    <label>Confirm New Password: <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm password" /></label></div>}

                </div>
                <div>
                    <label>
                        Username: <input id="username" name="username" defaultValue={currentUser.Nickname} placeholder="Username " />
                    </label>
                    <label>
                        First name: <input id="firstname" name="firstname" defaultValue={currentUser.FirstName} placeholder="First name" />
                    </label>
                    <label>
                        Last name: <input id="lastname" name="lastname" defaultValue={currentUser.LastName} placeholder="Last name" />
                    </label>
                    <label>
                        Age: <input id="age" name="age" type="number" defaultValue={currentUser.Age} placeholder="Age" />
                    </label>
                    <label>
                        Discord Nick: <input id="discord" name="discord" defaultValue={currentUser.DiscordNick} placeholder="Discord nick" />
                    </label>
                    {/*<label>
                    Avatar: 
                </label>*/}</div><br />
                <button className="text-2xl" type="submit">Edit Profile Info</button>
            </form>
        </>
    )
}

export default EditProfileForm;