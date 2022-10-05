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
import { useNavigate } from "react-router-dom";


const Profile: React.FC = () => {
    const [{ profile, email }, dispatch] = useStateValue();
    const [addGame, setAddGame] = React.useState<boolean>(false);
    const navigate = useNavigate();
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
                <AddGame closeForm={setAddGame} />
            )
        }
        return (<div key={user[0].ProfileId}>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <br />
            <AddPost currentUser={user[0]}/>
            <Posts currentUser={user[0]}/>
            <ProfileInfo />
            <br />

            <Games />
            <button onClick={addNewGame}>Add New Game</button>
        </div>)
    } else {
        return (<>Loading....</>)
    }

};

export default Profile;