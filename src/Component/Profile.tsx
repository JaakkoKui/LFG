import React from "react";
import { useStateValue } from "../state/state";
import { deleteProfile, getProfiles } from "../services/profileService";
import { Game, User, Post, ProfileModel } from "../types";
import { deleteUser, getUsers } from "../services/userService";
import AddGame from "./AddGame";
import { deleteGame, getAll } from "../services/gameService";
import Games from "./Games";
import ProfileInfo from "./ProfileInfo";
import AddPost from "./AddPost";
import { deletePost, getPosts } from "../services/postService";
import Posts from "./Posts";
import EditProfileForm from "./EditProfileForm";
import { rootNavigate } from "./CustomRouter";

const Profile: React.FC = () => {
    const [{ profile, email, user, posts, games }, dispatch] = useStateValue();
    const [addGame, setAddGame] = React.useState<boolean>(false);
    const [newPost, setNewPost] = React.useState<boolean>(false);
    const [editProfile, setEditProfile] = React.useState<boolean>(false);

    const showEditForm = () => {
        setEditProfile(!editProfile);
    }
    const addNewGame = () => {
        setAddGame(!addGame);
    }

    const togglePost = () => {
        setNewPost(!newPost)
    }

    const loggedUser = Object.values(user).find(u => u.Email === email) as User;

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

    const removeProfile = () => {
        if (window.confirm(`Are you sure you want to remove your profile, note that this action will remove your logging info as well?`)) {
            const myPosts = Object.values(posts).filter(post => Number(post.PosterProfile) === Number(thisuser[0].ProfileId));
            const myGames = Object.values(games).filter(game => Number(game.ProfileId) === Number(thisuser[0].ProfileId));
            const logged = Object.values(profile).find(prof => prof.Email === email) as ProfileModel;
            myPosts.map(post => {
                deletePost(Number(post.PostId));
            })

            myGames.map(game => {
                deleteGame(Number(game.GameId))
            })


            deleteProfile(Number(logged.ProfileId));
            deleteUser(Number(loggedUser.UserId));

            window.localStorage.clear();
            dispatch({ type: "LOGOUT", payload: "" });
            rootNavigate("/login");
            window.location.reload();
        }
    }

    const thisuser = Object.values(profile).filter(prof => prof.Email === email);

    if (thisuser.length !== 0) {
        if (addGame) {
            return (
                <AddGame closeForm={addNewGame} currentUser={thisuser[0]} />
            )
        }
        return (
            <>
                <button className="text-2xl" onClick={showEditForm}>Edit profile</button> <br />
                {editProfile && <EditProfileForm currentUser={thisuser[0]} toggleForm={showEditForm} />}
                <div>
                    <button onClick={removeProfile}>Delete Profile</button>
                </div>
                <div key={thisuser[0].ProfileId} className='min-h-[calc(100vh-65px)] z-10 bg-darkBackground text-gray-200'>

                    <ProfileInfo currentUser={thisuser[0]} />

                    <div id='game-section' className='px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto'>
                        <div className='font-bold text-3xl pb-7 w-full flex w-full'>
                            <h1>Games</h1>
                            <hr className='border-2 border-gray-300 w-full mt-5 ml-5 rounded-md'></hr>
                        </div>
                        <div className='flex w-fit'>
                            <Games currentUser={thisuser[0]} />
                            <div className='ring-4 hover:ring-4 hover:ring-primary hover:ring-offset-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground '>
                                <button onClick={addNewGame} className='rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary'>+</button>
                            </div>
                        </div>
                    </div>

                <div className='px-10 py-10'>
                    <div className='font-bold text-3xl pb-7 flex w-full'>
                        <h1 className='w-fit'>Your&nbsp;Posts</h1>
                        <hr className='border-2 border-gray-300 w-full mt-5 mx-5 rounded-md'></hr>
                        <button onClick={togglePost} className='rounded-full bg-primary text-sm px-4 py-2 w-28 hover:ring-4'>New Post</button>
                    </div>

                        <div className='text-gray-600'>
                            {newPost && <AddPost currentUser={thisuser[0]} toggleNewPost={togglePost} />}
                        </div>
                        <Posts currentUser={thisuser[0]} />
                    </div>
                </div></>
        )
    } else {
        return (<>Loading....</>)
    }

};

export default Profile;