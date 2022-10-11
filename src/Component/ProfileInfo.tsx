import React from "react";
import { ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}

const ProfileInfo: React.FC<Props> = ({ currentUser }) => {

    return (
        <div id="profileInfo" className='flex py-10 px-10'>
            <div className='mr-10'>
                <img className='h-[100px] w-[100px] max-w-[100px] object-contain rounded-full' src={'/images/DefaultAvatars/' + currentUser.Nickname + '.png'} alt='avatar' />
            </div>
            <div className='flex w-full relative'>

                <div>
                    <div className='flex h-fit'>
                        <h1 className="text-3xl font-bold h-fit"> {currentUser.Nickname} </h1>
                        <h4 className="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {currentUser.FirstName} {currentUser.LastName} )</h4>
                    </div>
                    <div>
                        <p>Age: {currentUser.Age}</p>
                    </div>
                </div>

                <div className='ml-auto font-semibold h-fit'>
                    <div className='flex w-fit absolute bottom-0 w-38 right-0'>
                        <img className='h-[15px] object-contain my-auto mr-1.5' src='/images/discord-icon.png' alt='discord' />
                        <p>{currentUser.DiscordNick}</p>
                    </div>
                    <p className='absolute top-0 w-38 right-0'>Join date: {currentUser.JoiningDate}</p>
                </div>

            </div>
        </div>
    )
}

export default ProfileInfo;