import React from "react";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{ posts }] = useStateValue();

    const myPosts = Object.values(posts).filter(post => Number(post.PosterProfile) === Number(currentUser.ProfileId));
    if (myPosts) {
        return (
            <>
                <ul>
                    {myPosts.map(post =>
                        <li key={Number(post.PostId)} className='border-2 rounded-lg border-white flex'>
                            <div className='border-r-2 px-10 py-5 relative'>
                                <h2 className='text-center'>{currentUser.Nickname}</h2>
                                <h4 className='text-center absolute bottom-1 left-0 w-full'>{post.CreateDate}</h4>
                            </div>
                            <div className='px-10 py-5'>
                                <h1 className='text-3xl font-bold mb-2 w-fit pb-2'>{post.Title}</h1>
                                <p>{post.Content}</p>
                            </div>
                            
                        </li>
                    )}
                </ul>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Posts;