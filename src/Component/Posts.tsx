import React from "react";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{ posts }] = useStateValue();

    const myPosts = Object.values(posts).filter(post => Number(post.PosterProfile) === Number(currentUser.ProfileId));
    myPosts.sort((A,B) => B.PostId - A.PostId);
    if (myPosts) {
        return (
            <>
                <ul>
                    {myPosts.map(post =>
                        <li key={Number(post.PostId)}>
                            <div className='py-5 bg-primary rounded-t-md flex break-words'>
                                <img className='h-[60px] ml-10 mr-5 object-contain w-fit border-4 border-darkBackground rounded-full bg-primary' src='/images/avatar-empty.png' alt='avatar' />
                                <div className='my-auto'>
                                    <h2 className='text-xl font-bold'>{currentUser.Nickname}</h2>
                                    <h4 className='text-center text-sm italic font-semibold'>{post.CreateDate}</h4>
                                </div>
                                <button className='ml-auto mr-8 p-2 hover:text-white hover:underline' >edit</button>
                            </div>
                            <div className='py-5 bg-lightBackground rounded-b-lg'>
                                <div className='px-10 pb-5'>
                                    <h1 className='break-words text-3xl font-bold mb-2 w-fit pb-2'>{post.Title}</h1>
                                    <p>{post.Content}</p>
                                </div>
                                <hr></hr>
                                <div className='pt-5 pl-7 pr-10 flex'>
                                    <button className='px-3 hover:text-white'>like</button>
                                    <button className='px-3 hover:text-white'>dislike</button>
                                </div>
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