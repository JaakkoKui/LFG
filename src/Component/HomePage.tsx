import React from "react"
import { Link } from "react-router-dom";
import { getAll } from "../services/gameService";
import { getPosts } from "../services/postService";
import { getProfiles } from "../services/profileService";
import { getUsers } from "../services/userService";
import { useStateValue } from "../state/state";
import { Game, Post, ProfileModel, User } from "../types";

const HomePage: React.FC = () => {
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

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Home Page
            </h1>
            <div>
                Posts:
                <ul>
                    {allPosts.map(post =>
                        <li key={Number(post.PostId)}>title: {post.Title} <br />
                            Content: {post.Content} <br />
                            By: <Link to={`/profile/${Number(allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.ProfileId)}`}>{allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.Nickname}</Link>
                            <br />
                            <br />/ /</li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default HomePage;