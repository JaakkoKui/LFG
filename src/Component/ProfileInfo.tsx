import React from "react";
import { useStateValue } from "../state/state";

const ProfileInfo: React.FC = () => {
    const [{ profile, email }] = useStateValue();

    const user = Object.values(profile).filter(prof => prof.Email === email);
    const myProfile = user[0];

    return (
        <div id="profileInfo" className='flex py-10 px-10'>
            <div className='ring-4 mr-10 ring-primary rounded-full bg-primary'>
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

                <div className='ml-auto font-semibold h-fit'>
                    <div className='flex w-fit absolute bottom-0 w-38 right-0'>
                        <img className='h-[15px] object-contain my-auto mr-1.5' src='/images/discord-icon.png' alt='discord' />
                        <p>{myProfile.DiscordNick}</p>
                    </div>
                    <p className='absolute top-0 w-38 right-0'>Join date: {myProfile.JoiningDate}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;