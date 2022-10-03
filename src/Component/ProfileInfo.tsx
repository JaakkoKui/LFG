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
        <div id="profileInfo" className='flex py-5 mb-6 mx-6 ring-4 ring-primary rounded-md'>
            <div className='mx-6 ring-4 ring-primary rounded-full bg-primary'>
                <img className='h-[100px] object-contain' src='/images/avatar-empty.png' alt='avatar' />
            </div>
            <div className='flex w-full relative'>

                <div>
                    <div className='flex h-fit'>
                        <h1 className="text-3xl font-bold h-fit"> {myProfile.Nickname} </h1>
                        <h4 className="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {myProfile.FirstName} {myProfile.LastName} )</h4>
                    </div>
                    <div>
                        <p>Age: {myProfile.Age}</p>
                    </div>
                </div>

                <div className='absolute bottom-0 left-0'>
                    <p>Discord: {myProfile.DiscordNick}</p>
                </div>

                <p className='ml-auto mr-6'>Joining date: {myProfile.JoiningDate}</p>
            </div>
        </div>
    )
}

export default ProfileInfo;