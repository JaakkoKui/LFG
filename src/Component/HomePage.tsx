import React from "react"
import { getPosts } from "../services/postService";
import { getUsers } from "../services/userService";
import { useStateValue } from "../state/state";
import { Post, User } from "../types";

const HomePage:React.FC = () => {
const [{posts,profile}, dispatch] = useStateValue();
    const allPosts = Object.values(posts).concat();
    allPosts.sort((a, b) => Number(b.PostId)- Number(a.PostId));
    const allProfiles = Object.values(profile).concat();
    React.useEffect(()=>{
        getUsers().then(user => {
            const users: User[] = user as User[];

            dispatch({ type: "GET_USERS", payload: users });
        });

        getPosts().then(post => {
            const posts: Post[] = post as Post[];

            dispatch({type: "GET_POSTS", payload: posts});
        })
    }, [dispatch]);

    return(
        <>
            <h1 className="text-3xl font-bold underline">
                Home Page
            </h1>
            <div>

                Posts:
                <ul>
                {allPosts.map(post =>
                    <li key={post.PostId}>title: {post.Title} <br />
                    Content: {post.Content} <br/>
                    By: {allProfiles.find(prof => Number(prof.ProfileId) === Number(post.PosterProfile))?.Nickname}
                    <br/> / /</li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default HomePage;