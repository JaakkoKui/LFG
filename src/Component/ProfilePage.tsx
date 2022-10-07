import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";
import Games from "./Games";
import Posts from "./Posts";
import ProfileInfo from "./ProfileInfo";

const ProfilePage: React.FC = () => {
    const [{ profile }] = useStateValue();

    const id = useParams().id as string;
    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.ProfileId) === Number(id)) as ProfileModel


    return (
        <>
            <ProfileInfo currentUser={thisUser} />
            <Games currentUser={thisUser} />
            <Posts currentUser={thisUser} />
        </>
    )
}

export default ProfilePage;