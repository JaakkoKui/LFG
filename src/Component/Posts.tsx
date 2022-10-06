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
                            <div className='border-r-2 pt-6 pb-3 relative w-[10rem] bg-primary rounded-md'>
                                <div className='mx-auto mb-10 w-fit ring-4 ring-darkBackground rounded-full bg-primary'>
                                    <img className='h-[120px] w-[120px] object-contain' src='/images/avatar-empty.png' alt='avatar' />
                                </div>
                                <h2 className='w-full mb-3 text-center text-xl font-bold break-words'>{currentUser.Nickname}</h2>
                                <h4 className='bottom-5 left-0 w-full text-center text-sm italic font-semibold break-words'>{post.CreateDate}</h4>
                            </div>
                            <div className='px-10 py-10'>
                                <h1 className='break-words text-3xl font-bold mb-2 w-fit pb-2'>{post.Title}</h1>
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