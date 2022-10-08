import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";
import { rootNavigate } from "./CustomRouter";
import Games from "./Games";
import Posts from "./Posts";
import ProfileInfo from "./ProfileInfo";

const ProfilePage: React.FC = () => {
    const [{ profile,email }] = useStateValue();

    const id = useParams().id as string;
    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.ProfileId) === Number(id)) as ProfileModel
    if(thisUser.Email === email){
        rootNavigate("/profile");
    }
    return (
        <div key={thisUser.ProfileId} className='min-h-[calc(100vh-65px)] z-10 bg-darkBackground text-gray-200'>

            <ProfileInfo currentUser={thisUser}/>

                <div id='game-section' className='px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto'>
                    <div className='font-bold text-3xl pb-7 w-full flex w-full'>
                        <h1>Games</h1>
                        <hr className='border-2 border-gray-300 w-full mt-5 ml-5 rounded-md'></hr>
                    </div>
                    <div className='flex w-fit'>
                    <Games currentUser={thisUser} />
                    </div>
                </div>

                <div className='px-10 py-10'>
                <div className='font-bold text-3xl pb-7 flex w-full'>
                    <h1 className='w-fit'>{thisUser.Nickname}&apos;s&nbsp;Posts</h1>
                    <hr className='border-2 border-gray-300 w-full mt-5 ml-5 rounded-md'></hr>
                    </div>
                <Posts currentUser={thisUser} />
                </div>
            </div>
    )
}

export default ProfilePage;