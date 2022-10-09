import React from "react"
import { Link } from "react-router-dom";
import { getAll } from "../services/gameService";
import { deletePost, getPosts } from "../services/postService";
import { getProfiles } from "../services/profileService";
import { getUsers } from "../services/userService";
import { useStateValue } from "../state/state";
import { Game, Post, ProfileModel, User } from "../types";
import EditPostForm from "./EditPostForm";
import CSS from 'csstype';

interface Props {
    currentUser?: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{ posts, profile, email }, dispatch] = useStateValue();
    const [editForm, toggleForm] = React.useState<boolean>(false);
    const [moreDropdown, toggleDropdown] = React.useState<boolean>(false);

    const toggle = () => {
        toggleForm(!editForm);
    }

    const toggleDrop = () => {
        toggleDropdown(!moreDropdown);
    }

    const allPosts = Object.values(posts).concat();
    allPosts.sort((a, b) => Number(b.PostId) - Number(a.PostId));
    const allProfiles = Object.values(profile).concat();

    React.useEffect(() => {
        getProfiles().then(data => {

            const profiles: ProfileModel[] = data as ProfileModel[];
            dispatch({ type: "GET_PROFILES", payload: profiles });
        });
        getUsers().then(user => {
            const users: User[] = user as User[];

            dispatch({ type: "GET_USERS", payload: users });
        });

        getAll().then(game => {
            const games: Game[] = game as Game[];

            dispatch({ type: "GET_GAME_LIST", payload: games });
        });

        getPosts().then(post => {
            const posts: Post[] = post as Post[];
            posts.sort((a, b) => Number(b.PostId) - Number(a.PostId));
            dispatch({ type: "GET_POSTS", payload: posts });
        })

        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON && loggedUserJSON !== undefined) {
            const user = JSON.parse(loggedUserJSON);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, [dispatch]);

    const handleDelete = (post: Post) => {
        if (window.confirm(`Are you sure you want to delete post titled ${post.Title}?`)) {
            deletePost(Number(post.PostId));
            window.location.reload();
        }
    }

    const contentStyle: CSS.Properties = {
        whiteSpace: "pre-line"
    }

    if (currentUser) {
        const myPosts = Object.values(posts).filter(post => Number(post.PosterProfile) === Number(currentUser.ProfileId));
        myPosts.sort((A, B) => Number(B.PostId) - Number(A.PostId));
        if (myPosts) {
            return (
                <div className='flex flex-col'>
                    <hr className='w-full border-gray-700'></hr>
                    {myPosts.map(post =>
                        <>
                            <div key={Number(post.PostId)} className='flex rounded-lg py-5'>

                                <div className='mx-5 w-fit'>
                                    <img className='w-[50px] object-contain rounded-full bg-primary' src='/images/test-avatar.png' alt='avatar' />
                                </div>

                                <div className='relative w-full flex'>
                                    <div className='w-full'>
                                        <div className='flex h-[50px]'>
                                            <h2 className='text-md font-bold hover:text-white'>{currentUser.Nickname}</h2>
                                            <h4 className='text-sm italic font-semibold text-gray-400 pt-0.5 ml-3'>{post.CreateDate}</h4>
                                            <button className='right-5 h-fit absolute text-gray-400 hover:text-white' onClick={toggleDrop}>
                                                <span className="material-symbols-outlined">
                                                    more_horiz
                                                </span>
                                            </button>
                                            { moreDropdown &&
                                                <div className='right-5 flex flex-col absolute bg-white text-gray-800 text-center rounded-md drop-shadow-md'>
                                                    <button className='py-2 w-28 border-b' onClick={toggleDrop} >Cancel</button>
                                                    {currentUser.Email === email && <button className='py-2 w-28 border-b' onClick={toggle}>Edit</button>}
                                                    {currentUser.Email === email && <button className='py-2 w-28 text-red-500 hover:bg-gray-200 hover:text-red-600' onClick={() => handleDelete(post)}>Delete</button>}
                                                </div>
                                            }
                                        </div>

                                        <div className='mb-5'>
                                            <h1 className='break-words text-xl font-bold mb-2'>{post.Title}</h1>
                                            <p style={contentStyle}>{post.Content}</p>
                                        </div>

                                        {editForm && <EditPostForm currentPost={post} toggleForm={toggle} />}

                                        <div className='flex mt-auto text-gray-400'>
                                            <p className='border-r pr-2.5 border-gray-400'>0 likes</p>
                                            <p className='pl-2.5'>0 dislikes</p>
                                        </div>
                                    </div>

                                    <div className='w-[50px] mx-5'>
                                    </div>
                                </div>
                            </div>
                            <hr className='w-full border-gray-700'></hr>
                        </>

                        ,{ /*
                        <div key={Number(post.PostId)} className='flex flex-col gap-y-4'>
                        <div key={Number(post.PostId)}>
                            <div className='py-5 bg-primary rounded-t-md flex break-words'>
                                <img className='w-[50px] mx-5 object-contain w-fit border-4 border-darkBackground rounded-full bg-primary' src='/images/test-avatar.png' alt='avatar' />
                                <div className='my-auto'>
                                    <h2 className='text-xl font-bold'>{currentUser.Nickname}</h2>
                                    <h4 className='text-center text-sm italic font-semibold'>{post.CreateDate}</h4>
                                </div>
                            </div>
                            <div className='py-5 bg-lightBackground rounded-b-lg flex'>
                                <div className='flex flex-col justify-between h-16 px-5 mt-2'>
                                    <button className='w-[50px] hover:text-white'>
                                        <span className='material-symbols-outlined'>
                                            thumb_up
                                        </span>
                                    </button>
                                    <button className='w-[50px] hover:text-white'>
                                        <span className='material-symbols-outlined'>
                                            thumb_down
                                        </span>
                                    </button>
                                </div>
                                <div className='pr-7'>
                                    <h1 className='break-words text-2xl font-bold mb-2 w-fit pb-2'>{post.Title}</h1>
                                    <p style={contentStyle}>{post.Content}</p>

                                    <div className='flex pt-5'>
                                        <p className='border-r pr-2.5'>0 likes</p>
                                        <p className='pl-2.5'>0 dislikes</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {currentUser.Email === email && <button onClick={() => handleDelete(post)}>Delete this post</button>}
                        {currentUser.Email === email && <button onClick={toggle}>Edit this post</button>} {editForm && <EditPostForm currentPost={post} toggleForm={toggle} />}
                    </div>
                    */ }
                    )}
                </div>
            )
        } else {
            return <></>
        }
    } else {
        return (
            <div className='flex flex-col'>
                <hr className='w-full border-gray-700'></hr>
                {allPosts.map(post =>
                    <> 
                        <div key={Number(post.PostId)} className='flex rounded-lg py-5'>

                            <div className='mx-5 w-fit'>
                                <img className='w-[50px] object-contain rounded-full bg-primary' src='/images/test-avatar.png' alt='avatar' />
                            </div>

                            <div className='relative w-full flex'>
                                <div className='w-full'>
                                    <div className='flex h-[50px]'>
                                        <h2 className='text-md font-bold hover:text-white'><Link to={`/profile/${Number(allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.ProfileId)}`}>{allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.Nickname}</Link></h2>
                                        <h4 className='text-sm italic font-semibold text-gray-400 pt-0.5 ml-3'>{post.CreateDate}</h4>
                                    </div>

                                    <div className='mb-5'>
                                        <h1 className='break-words text-xl font-bold mb-2'>{post.Title}</h1>
                                        <p style={contentStyle}>{post.Content}</p>
                                    </div>

                                    <div className='flex mt-auto text-gray-400'>
                                        <p className='border-r pr-2.5 border-gray-400'>0 likes</p>
                                        <p className='pl-2.5'>0 dislikes</p>
                                    </div>
                                </div>

                                <div className='text-gray-400 h-fit my-auto w-[50px] mx-5'>
                                    <button className='w-[50px] py-2.5 hover:text-white'>
                                        <span className='material-symbols-outlined'>
                                            thumb_up
                                        </span>
                                    </button>
                                    <button className='w-[50px] py-2.5 hover:text-white'>
                                        <span className='material-symbols-outlined'>
                                            thumb_down
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className='w-full border-gray-700'></hr>
                    </>
                )}
            </div>
        )
    }
}

export default Posts;