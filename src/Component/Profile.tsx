import React from "react";
import { useStateValue } from "../state/state";
import { getProfiles } from "../services/profileService";
import { Game, User, Post, ProfileModel } from "../types";
import { getUsers } from "../services/userService";
import AddGame from "./AddGame";
import { getAll } from "../services/gameService";
import Games from "./Games";
import ProfileInfo from "./ProfileInfo";
import AddPost from "./AddPost";
import { getPosts } from "../services/postService";
import Posts from "./Posts";

const Profile: React.FC = () => {
    const [{ profile, email }, dispatch] = useStateValue();
    const [addGame, setAddGame] = React.useState<boolean>(false);
    const addNewGame = () => {
        setAddGame(true);
    }

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

            dispatch({type: "GET_POSTS", payload: posts});
        })

        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON && loggedUserJSON !== undefined) {
            const user = JSON.parse(loggedUserJSON);
            dispatch({ type: "LOGIN", payload: user });
        }
    }, [dispatch]);


    const user = Object.values(profile).filter(prof => prof.Email === email);

    if (user.length !== 0) {
        if (addGame) {
            return (
                <AddGame closeForm={setAddGame} currentUser={user[0]} />
            )
        }
        return (
            <div key={user[0].ProfileId} className='min-h-[calc(100vh-65px)] z-10 bg-darkBackground text-gray-200'>

                <ProfileInfo />

                <div id='game-section' className='px-10 pb-10 pt-8 bg-white text-gray-600 overflow-x-auto'>
                    <div className='font-bold text-3xl pb-7 w-full flex w-full'>
                        <h1>Games</h1>
                        <hr className='border-2 border-gray-300 w-full mt-5 ml-5 rounded-md'></hr>
                    </div>
                    <div className='flex w-fit'>
                        <Games currentUser={user[0]} />
                        <div className='ring-4 hover:ring-4 hover:ring-primary hover:ring-offset-4 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground '>
                            <button onClick={addNewGame} className='rounded-lg w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary'>+</button>
                        </div>
                    </div>
                </div>

                <div className='px-10 py-10'>
                    <div className='font-bold text-3xl pb-7 flex w-full'>
                        <h1>Posts</h1>
                        <hr className='border-2 border-gray-300 w-full mt-5 mx-5 rounded-md'></hr>
                        <button className='rounded-full bg-primary text-sm px-4 py-2 w-28'>New Post</button>
                    </div>
                    <Posts currentUser={user[0]} />
                    <div className='text-gray-600'>
                        {/*<AddPost currentUser={user[0]} >*/}
                    </div>

                </div>
            </div>
        )
    } else {
        return (<>Loading....</>)
    }

};

export default Profile;