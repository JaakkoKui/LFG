import React from "react";
import { useStateValue } from "../state/state";
import { getProfiles } from "../services/profileService";
import { Login, ProfileModel } from "../types";
import { getUsers } from "../services/userService";


const Profile: React.FC = () => {
    const [{ profile }, dispatch] = useStateValue();
    const [{ email }] = useStateValue();

    React.useEffect(() => {

        getProfiles().then(data => {

            const profiles: ProfileModel[] = data as ProfileModel[];
            dispatch({ type: "GET_PROFILES", payload: profiles });
        });
        getUsers().then(user => {
            const users: Login[] = user as Login[];

            dispatch({ type: "GET_USERS", payload: users });
        })

    }, [dispatch]);

    if (email !== "") {

        const user = Object.values(profile).filter(prof => prof.Email === email);

        if (user.length !== 0) {
            return (<div key={user[0].ProfileId}>
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>
                <div>Nickname: {user[0].Nickname}</div>
                <div>Firstname: {user[0].FirstName}</div>
            </div>)
        } else {
            return (<></>)
        }
    } else {
        return (
            <></>
        );

    }
};

export default Profile;