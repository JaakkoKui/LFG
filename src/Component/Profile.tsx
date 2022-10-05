import React from "react";
import { useStateValue } from "../state/state";
import { getProfiles } from "../services/profileService";
import { Game, Login, Post, ProfileModel } from "../types";
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
            const users: Login[] = user as Login[];

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
                <AddGame closeForm={setAddGame} />
            )
        }
        return (
            <div key={user[0].ProfileId} className='min-h-[calc(100vh-65px)] z-10 bg-darkBackground text-gray-200'>

                <Posts currentUser={user[0]} />

                <ProfileInfo />

                <div id='game-section' className='border-primary border-y-4 px-10 pb-10 bg-white text-gray-600'>
                    <h1 className='font-bold text-3xl py-5'>Games</h1>
                    <div className='flex'>
                        <Games />
                        <div className='ring-2 rounded-md ring-darkBackground flex flex-col h-96 w-60 mx-2 relative'>
                            <button onClick={addNewGame} className='w-full h-full font-bold text-7xl bg-darkBackground text-white hover:bg-primary'>+</button>
                        </div>
                    </div>
                </div>

                <div className='px-10 py-10'>
                    <AddPost currentUser={user[0]} />
                </div>
            </div>
        )
    } else {
        return (<>Loading....</>)
    }

};

export default Profile;