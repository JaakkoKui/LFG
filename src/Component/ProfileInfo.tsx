import React from "react";
import { getProfiles } from "../services/profileService";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";


const ProfileInfo: React.FC = () => {
    const [{profile, email}, dispatch] = useStateValue();
/*
    React.useEffect(() => {
        
    }, [dispatch])
*/
    const user = Object.values(profile).filter(prof => prof.Email === email);
    const myProfile = user[0];
    return(
        <>
            <h1 className="text-3xl">{myProfile.Nickname}</h1>
            <div>First name: {myProfile.FirstName}</div>
            <div>Last name: {myProfile.LastName}</div>
            <div>Age: {myProfile.Age}</div>
            <div>Discord Nick: {myProfile.DiscordNick}</div>
            <div>Joining date: {myProfile.JoiningDate}</div>
        </>
    )
}

export default ProfileInfo;