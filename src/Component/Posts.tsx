import React from "react"
import { Link } from "react-router-dom";
import { getAll } from "../services/gameService";
import { getPosts } from "../services/postService";
import { getProfiles } from "../services/profileService";
import { getUsers } from "../services/userService";
import { useStateValue } from "../state/state";
import { Game, Post, ProfileModel, User } from "../types";

interface Props {
    currentUser?: ProfileModel;
}

const Posts: React.FC<Props> = ({ currentUser }) => {
    const [{ posts, profile }, dispatch] = useStateValue();

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

    if (currentUser) {
        const myPosts = Object.values(posts).filter(post => Number(post.PosterProfile) === Number(currentUser.ProfileId));
        myPosts.sort((A, B) => Number(B.PostId) - Number(A.PostId));
        if (myPosts) {
            return (
                <div className='flex flex-col gap-y-4'>
                    {myPosts.map(post =>
                        <div key={Number(post.PostId)} className='flex flex-col gap-y-4'>
                            <div key={Number(post.PostId)}>
                                <div className='py-5 bg-primary rounded-t-md flex break-words'>
                                    <img className='w-[50px] mx-5 object-contain w-fit border-4 border-darkBackground rounded-full bg-primary' src='/images/test-avatar.png' alt='avatar' />
                                    <div className='my-auto'>
                                        <h2 className='text-xl font-bold'>You</h2>
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
                                        <p>{post.Content}</p>

                                        <div className='flex pt-5'>
                                            <p className='border-r pr-2.5'>0 likes</p>
                                            <p className='pl-2.5'>0 dislikes</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            )
        } else {
            return <></>
        }
    } else {
        return (
            <div className='flex flex-col gap-y-4'>
                {allPosts.map(post =>
                    <div key={Number(post.PostId)}>
                        <div className='py-5 bg-primary rounded-t-md flex break-words'>
                            <img className='w-[50px] mx-5 object-contain w-fit border-4 border-darkBackground rounded-full bg-primary' src='/images/test-avatar.png' alt='avatar' />
                            <div className='my-auto'>
                                <h2 className='text-xl font-bold'><Link to={`/profile/${Number(allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.ProfileId)}`}>{allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.Nickname}</Link></h2>
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
                            <div className='pr-7 pb-5'>
                                <h1 className='break-words text-2xl font-bold mb-2 w-fit pb-2'>{post.Title}</h1>
                                <p>{post.Content}</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        )
    }
}

export default Posts;