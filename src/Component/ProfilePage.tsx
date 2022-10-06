import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";
import Games from "./Games";
import Posts from "./Posts";

const ProfilePage: React.FC = () => {
    const [{profile}] = useStateValue();

    const id = useParams().id as string;
    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.ProfileId) === Number(id)) as ProfileModel


    return(
        <><div id="profileInfo" className='flex py-10 px-6'>
            <div className='mx-6 ring-4 ring-primary rounded-full bg-primary'>
                <img className='h-[100px] object-contain' src='/images/avatar-empty.png' alt='avatar' />
            </div>
            <div className='flex w-full relative'>

                <div>
                    <div className='flex h-fit'>
                        <h1 className="text-3xl font-bold h-fit"> {thisUser.Nickname} </h1>
                        <h4 className="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {thisUser.FirstName} {thisUser.LastName} )</h4>
                    </div>
                    <div>
                        <p>Age: {thisUser.Age}</p>
                    </div>
                </div>

                <div className='absolute bottom-0 left-0'>
                    <p>Discord: {thisUser.DiscordNick}</p>
                </div>

                <p className='ml-auto mr-6'>Joining date: {thisUser.JoiningDate}</p>
            </div>
        </div>
        <Games currentUser={thisUser}/>
        <Posts currentUser={thisUser} />
        </>
    )
}

export default ProfilePage;